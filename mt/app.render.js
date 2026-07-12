    // --- Rendering Components ---
    function renderCardHTML(card, options = {}) {
      if (!card) return '';
      const isSelected = options.isSelected || false;
      const disabled = options.disabled || false;
      const isHandCard = options.isHandCard || false;
      const isReadOnly = options.isReadOnly || false;
      const glow = options.glow || false;
      const customStyle = options.customStyle || '';
      const hideFooter = options.hideFooter || false;
      const hideModeMarks = options.hideModeMarks || window.ROLETRADE_ACTIVE_JOURNEY === 'second';
      
      const ModeIconName = MODE_ICON_NAMES[card.mode];
      
      let auraClass = '';
      if (isHandCard && !disabled && !isReadOnly) {
         if (isSelected) {
             auraClass = 'animate-cardAuraSelected';
         } else {
             auraClass = 'animate-cardAura';
         }
      }

      let selectedStyle = '';
      let normalStyle = '';

      if (isHandCard && !disabled && !isReadOnly) {
        selectedStyle = 'scale-[1.08] sm:scale-125 z-[100] -translate-y-1 sm:-translate-y-4 ' + auraClass;
        normalStyle = 'hover:-translate-y-2 ' + auraClass;
      } else {
        selectedStyle = 'border-yellow-500 scale-110 shadow-[0_0_20px_rgba(234,179,8,0.6)] z-20 -translate-y-4';
        normalStyle = 'border-stone-400 hover:border-orange-400/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:-translate-y-2';
      }

      const baseClasses = 'role-card relative w-[96px] h-[136px] sm:w-32 sm:h-48 rounded-md shadow-lg border flex flex-col transition-all duration-500 overflow-hidden origin-bottom bg-center bg-cover appearance-none bg-transparent p-0 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900';
      
      let combinedClasses = baseClasses + " ";
      combinedClasses += isSelected ? selectedStyle : normalStyle;
      combinedClasses += " ";
      if (disabled) combinedClasses += 'opacity-50 cursor-not-allowed grayscale-[0.3] hover:translate-y-0 hover:shadow-lg ';
      combinedClasses += isReadOnly ? 'cursor-default hover:translate-y-0 hover:scale-100 ' : 'cursor-pointer ';
      combinedClasses += glow ? 'border-yellow-500/80 shadow-[0_0_20px_rgba(234,179,8,0.4)] z-20 ' : '';
      combinedClasses += customStyle;

      const isInteractive = !disabled && !isReadOnly && (isHandCard || options.isShopCard || options.isResultCard);
      let actionData = '';
      if (isInteractive) {
        if (isHandCard) actionData = 'data-action="select-hand" data-id="' + card.id + '"';
        else if (options.isShopCard) actionData = 'data-action="select-shop" data-id="' + card.id + '"';
        else if (options.isResultCard) actionData = 'data-action="select-result" data-id="' + card.id + '"';
      }

      const cardTag = isInteractive ? 'button' : 'div';
      const cardAttrs = isInteractive
        ? 'type="button" ' + actionData + ' aria-label="' + escapeAttribute(card.name + '。' + card.desc + ' ' + (isSelected ? '選択を解除' : '選択')) + '" aria-pressed="' + (isSelected ? 'true' : 'false') + '" '
        : '';

      return `
        <${cardTag} ${cardAttrs}class="${combinedClasses}" style="background-image: url('${CARD_BG_IMG}');">
          <div class="role-card-watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none z-0">
            ${getIcon(ModeIconName, "w-12 h-12 sm:w-20 sm:h-20 text-orange-900")}
          </div>
          
          <div class="absolute inset-0 bg-gradient-to-b from-orange-900/5 via-transparent to-stone-500/10 pointer-events-none rounded-md z-0"></div>
          
          <div class="p-1 sm:p-1.5 pb-2 sm:pb-3 flex-1 flex flex-col relative z-20 justify-between">
            <div>
              <div class="role-card-title font-black font-sans text-stone-900 text-[15px] sm:text-[19px] tracking-tight text-center relative leading-none mb-1 sm:mb-1.5 w-full flex items-center justify-center pt-2 sm:pt-3">
                <span class="break-keep drop-shadow-sm px-1 z-10 w-full text-center">${card.name}</span>
              </div>
            </div>
            <div class="role-card-desc text-[10px] sm:text-[11px] text-stone-800 font-extrabold flex-1 leading-tight sm:leading-relaxed font-serif mt-1 sm:mt-2 line-clamp-4 text-center px-0.5">${card.desc}</div>
            <div class="role-card-footer ${hideFooter ? 'hidden' : ''} text-[8px] sm:text-[9px] text-stone-600 font-serif tracking-widest mt-1 text-center font-bold flex justify-center items-center gap-0.5">
              ${hideModeMarks ? '' : getIcon(ModeIconName, "w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-90 " + MODE_TEXT_COLORS[card.mode])}
              <span class="mt-[1px]">RIESM</span>
              ${hideModeMarks ? '' : getIcon(ModeIconName, "w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-90 " + MODE_TEXT_COLORS[card.mode])}
            </div>
          </div>
        </${cardTag}>
      `;
    }
