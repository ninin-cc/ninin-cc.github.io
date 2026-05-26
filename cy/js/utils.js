    const encodeBase64Unicode = (text) => {
      const bytes = new TextEncoder().encode(text);
      let binary = '';
      bytes.forEach(byte => { binary += String.fromCharCode(byte); });
      return btoa(binary);
    };

    const decodeBase64Unicode = (encoded) => {
      const binary = atob(encoded.trim());
      const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    };

    const bytesToBase64 = (bytes) => {
      let binary = '';
      const chunkSize = 0x8000;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.subarray(i, i + chunkSize);
        binary += String.fromCharCode.apply(null, chunk);
      }
      return btoa(binary);
    };

    const base64ToBytes = (encoded) => {
      const normalized = String(encoded || '').trim().replace(/\s/g, '+');
      const binary = atob(normalized);
      return Uint8Array.from(binary, char => char.charCodeAt(0));
    };

    const requireCompressionStreams = () => {
      if (!('CompressionStream' in window) || !('DecompressionStream' in window)) {
        throw new Error('Compression Streams API is not supported in this browser.');
      }
    };

    const gzipCompressBytes = async (bytes) => {
      requireCompressionStreams();
      const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip'));
      return new Uint8Array(await new Response(stream).arrayBuffer());
    };

    const gzipDecompressBytes = async (bytes) => {
      requireCompressionStreams();
      const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
      return new Uint8Array(await new Response(stream).arrayBuffer());
    };

    const createCompressedStoryUrl = async (encodedStoryData) => {
      const jsonText = decodeBase64Unicode(encodedStoryData);
      const jsonBytes = new TextEncoder().encode(jsonText);
      const compressedBytes = await gzipCompressBytes(jsonBytes);
      const compressedBase64 = bytesToBase64(compressedBytes);
      const url = new URL(window.location.href);
      url.searchParams.delete('openExternalBrowser');
      url.searchParams.set('data', compressedBase64);
      return url.toString();
    };

    const restoreStoryBase64FromCompressedParam = async (compressedParam) => {
      const decodedParam = (() => {
        try {
          return decodeURIComponent(String(compressedParam || ''));
        } catch (error) {
          return String(compressedParam || '');
        }
      })();
      const compressedBytes = base64ToBytes(decodedParam);
      const jsonBytes = await gzipDecompressBytes(compressedBytes);
      const jsonText = new TextDecoder().decode(jsonBytes);
      return encodeBase64Unicode(jsonText);
    };

    const copyTextToClipboard = async (text) => {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    };

    const recollectionName = (type) => `回想の${charName(type)}`;

    function useCasualSourceGuard() {
      useEffect(() => {
        const guardedKeys = new Set(['s', 'u']);
        const guardedShiftKeys = new Set(['i', 'j', 'c']);

        const block = (event) => {
          event.preventDefault();
          event.stopPropagation();
          return false;
        };

        const handleContextMenu = (event) => block(event);
        const handleDragStart = (event) => block(event);
        const handleKeyDown = (event) => {
          const key = event.key.toLowerCase();
          const usesModifier = event.ctrlKey || event.metaKey;

          if (event.key === 'F12') return block(event);
          if (usesModifier && guardedKeys.has(key)) return block(event);
          if (usesModifier && event.shiftKey && guardedShiftKeys.has(key)) return block(event);
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('dragstart', handleDragStart);
        document.addEventListener('keydown', handleKeyDown, true);

        return () => {
          document.removeEventListener('contextmenu', handleContextMenu);
          document.removeEventListener('dragstart', handleDragStart);
          document.removeEventListener('keydown', handleKeyDown, true);
        };
      }, []);
    }

    function useLocalStorage(key, initialValue) {
      const [storedValue, setStoredValue] = useState(() => {
        try {
          const item = window.localStorage.getItem(key);
          return item ? JSON.parse(item) : initialValue;
        } catch (error) {
          console.log(error);
          return initialValue;
        }
      });

      const setValue = (value) => {
        try {
          setStoredValue((currentValue) => {
            const valueToStore = value instanceof Function ? value(currentValue) : value;
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            return valueToStore;
          });
        } catch (error) {
          console.log(error);
        }
      };

      return [storedValue, setValue];
    }
