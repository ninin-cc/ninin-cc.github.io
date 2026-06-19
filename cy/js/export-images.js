    const imageTheme = {
      width: 1200,
      height: 1697,
      bg: '#07111f',
      panel: '#0f172a',
      panel2: '#111827',
      border: '#facc15',
      text: '#f8fafc',
      muted: '#cbd5e1',
      blue: '#60a5fa',
      red: '#f87171',
      green: '#4ade80',
      purple: '#c084fc',
      parchment: '#f2dfad',
      parchmentBorder: '#a87533',
      ink: '#071f3f',
      brown: '#6b3f15'
    };

    const canvasFont = (size, weight = '400') => `${weight} ${size}px 'DotGothic16', 'Yu Gothic', 'Meiryo', sans-serif`;

    const roundRectPath = (ctx, x, y, w, h, r = 12) => {
      const radius = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + w - radius, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
      ctx.lineTo(x + w, y + h - radius);
      ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      ctx.lineTo(x + radius, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    const fillRoundRect = (ctx, x, y, w, h, r, fill, stroke, lineWidth = 2) => {
      ctx.save();
      roundRectPath(ctx, x, y, w, h, r);
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
      }
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
      ctx.restore();
    };

    const canvasLines = (ctx, text, maxWidth) => {
      const source = String(text || '');
      const lines = [];
      source.split('\n').forEach(part => {
        if (!part) {
          lines.push('');
          return;
        }
        let line = '';
        [...part].forEach(char => {
          const test = line + char;
          if (line && ctx.measureText(test).width > maxWidth) {
            lines.push(line);
            line = char;
          } else {
            line = test;
          }
        });
        lines.push(line);
      });
      return lines.length ? lines : [''];
    };

    const drawCanvasText = (ctx, text, x, y, maxWidth, lineHeight, options = {}) => {
      ctx.save();
      ctx.font = options.font || canvasFont(24);
      ctx.fillStyle = options.color || imageTheme.text;
      ctx.textBaseline = 'top';
      const lines = canvasLines(ctx, text || options.emptyText || '', maxWidth);
      const maxLines = options.maxLines || lines.length;
      const visibleLines = lines.slice(0, maxLines);
      visibleLines.forEach((line, index) => {
        let visible = line;
        if (index === maxLines - 1 && lines.length > maxLines) visible = `${line.slice(0, Math.max(0, line.length - 1))}…`;
        ctx.fillText(visible, x, y + index * lineHeight);
      });
      ctx.restore();
      return y + visibleLines.length * lineHeight;
    };

    const drawExportBackground = (ctx, height) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#101827');
      gradient.addColorStop(1, '#05070d');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, imageTheme.width, height);
      ctx.strokeStyle = imageTheme.border;
      ctx.lineWidth = 6;
      ctx.strokeRect(32, 32, imageTheme.width - 64, height - 64);
    };

    const drawExportFooter = (ctx, y) => {
      ctx.save();
      ctx.font = canvasFont(18);
      ctx.fillStyle = imageTheme.muted;
      ctx.textAlign = 'center';
      ctx.fillText(APP_CONFIG.exportTitle, imageTheme.width / 2, y);
      ctx.fillText('© ninin consulting & counseling LLC. All rights reserved.', imageTheme.width / 2, y + 28);
      ctx.restore();
      return y + 62;
    };

    const drawExportHeader = (ctx, title, player) => {
      let y = 72;
      ctx.save();
      ctx.textAlign = 'center';
      ctx.fillStyle = imageTheme.text;
      ctx.font = canvasFont(44, '700');
      ctx.fillText(APP_CONFIG.appName, imageTheme.width / 2, y);
      ctx.font = canvasFont(18, '700');
      ctx.fillStyle = imageTheme.muted;
      ctx.fillText(APP_CONFIG.appSubtitle.replace('　', ' '), imageTheme.width / 2, y + 54);
      ctx.font = canvasFont(30, '700');
      ctx.fillStyle = imageTheme.border;
      ctx.fillText(title, imageTheme.width / 2, y + 98);
      ctx.restore();

      y += 150;
      fillRoundRect(ctx, 90, y, imageTheme.width - 180, 120, 10, '#0b1220', imageTheme.border, 3);
      ctx.textAlign = 'center';
      ctx.fillStyle = imageTheme.muted;
      ctx.font = canvasFont(20, '700');
      ctx.fillText('冒険者', imageTheme.width / 2, y + 20);
      ctx.fillStyle = imageTheme.text;
      ctx.font = canvasFont(42, '700');
      ctx.fillText(`${player.name || '名もなき勇者'}  Lv.${player.age || '?'}`, imageTheme.width / 2, y + 52);
      ctx.textAlign = 'left';
      return y + 155;
    };

    const drawSectionTitle = (ctx, title, y) => {
      ctx.font = canvasFont(28, '700');
      ctx.fillStyle = imageTheme.border;
      ctx.fillText(`▼ ${title}`, 90, y);
      return y + 46;
    };

    const drawDarkCard = (ctx, x, y, w, h) => {
      fillRoundRect(ctx, x, y, w, h, 10, '#0f172a', '#334155', 2);
    };

    const drawParchmentCard = (ctx, x, y, w, h) => {
      fillRoundRect(ctx, x, y, w, h, 10, imageTheme.parchment, imageTheme.parchmentBorder, 3);
      ctx.save();
      ctx.strokeStyle = 'rgba(90, 60, 24, 0.18)';
      ctx.lineWidth = 1;
      for (let lineY = y + 34; lineY < y + h - 18; lineY += 30) {
        ctx.beginPath();
        ctx.moveTo(x + 18, lineY);
        ctx.lineTo(x + w - 18, lineY);
        ctx.stroke();
      }
      ctx.restore();
    };

    const cropCanvas = (canvas, usedHeight) => {
      const height = Math.min(canvas.height, Math.max(900, Math.ceil(usedHeight)));
      const output = document.createElement('canvas');
      output.width = canvas.width;
      output.height = height;
      output.getContext('2d').drawImage(canvas, 0, 0);
      return output;
    };

    const downloadCanvasPng = (canvas, filename) => {
      canvas.toBlob(blob => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }, 'image/png');
    };

    const drawLifeChartOnCanvas = (ctx, memories, x, y, w, h) => {
      const sorted = [...(memories || [])].sort((a, b) => a.age - b.age);
      drawDarkCard(ctx, x, y, w, h);
      const px = 54;
      const py = 36;
      const chartX = x + px;
      const chartY = y + py;
      const chartW = w - px * 2;
      const chartH = h - py * 2;
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(chartX, chartY + chartH / 2);
      ctx.lineTo(chartX + chartW, chartY + chartH / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = canvasFont(18);
      ctx.fillStyle = imageTheme.muted;
      ctx.fillText('+50', chartX - 42, chartY - 4);
      ctx.fillText('±0', chartX - 38, chartY + chartH / 2 - 10);
      ctx.fillText('-50', chartX - 42, chartY + chartH - 18);

      if (!sorted.length) {
        drawCanvasText(ctx, '記憶はまだ記録されていません。', chartX + 40, chartY + 110, chartW - 80, 30, { font: canvasFont(26), color: imageTheme.muted });
        return;
      }

      const getX = index => chartX + index * (chartW / Math.max(1, sorted.length - 1));
      const getY = satisfaction => chartY + chartH - (((Number(satisfaction) + 50) / 100) * chartH);

      ctx.beginPath();
      sorted.forEach((item, index) => {
        const cx = getX(index);
        const cy = getY(item.satisfaction);
        if (index === 0) {
          ctx.moveTo(cx, cy);
        } else {
          const prevX = getX(index - 1);
          const prevY = getY(sorted[index - 1].satisfaction);
          const c0x = prevX + (cx - prevX) * 0.4;
          const c1x = cx - (cx - prevX) * 0.4;
          ctx.bezierCurveTo(c0x, prevY, c1x, cy, cx, cy);
        }
      });
      ctx.strokeStyle = imageTheme.border;
      ctx.lineWidth = 5;
      ctx.stroke();

      sorted.forEach((item, index) => {
        const cx = getX(index);
        const cy = getY(item.satisfaction);
        ctx.fillStyle = imageTheme.bg;
        ctx.beginPath();
        ctx.arc(cx, cy, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = imageTheme.border;
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.font = canvasFont(18, '700');
        ctx.fillStyle = imageTheme.text;
        ctx.textAlign = 'center';
        ctx.fillText(`${item.age}歳`, cx, y + h - 28);
        ctx.textAlign = 'left';

        const labelY = cy < chartY + chartH / 2 ? cy + 16 : cy - 58;
        fillRoundRect(ctx, cx - 78, labelY, 156, 46, 6, 'rgba(0,0,0,0.7)', null);
        drawCanvasText(ctx, item.event || '', cx - 70, labelY + 7, 140, 16, { font: canvasFont(14), color: imageTheme.text, maxLines: 2 });
      });
    };

    const drawOverflowCount = (ctx, text, x, y, color = imageTheme.muted) => {
      ctx.save();
      ctx.font = canvasFont(18, '700');
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
      ctx.restore();
    };

    const createA4Canvas = () => {
      const canvas = document.createElement('canvas');
      canvas.width = imageTheme.width;
      canvas.height = imageTheme.height;
      drawExportBackground(canvas.getContext('2d'), canvas.height);
      return canvas;
    };

    const drawFixedFooter = (ctx) => drawExportFooter(ctx, imageTheme.height - 92);

    const createMemoryExportImage = ({ player, memories, chartInsight }) => {
      const canvas = createA4Canvas();
      const ctx = canvas.getContext('2d');
      let y = drawExportHeader(ctx, '歩んできた道：Memory', player);
      y = drawSectionTitle(ctx, '旅路の記録', y);
      drawLifeChartOnCanvas(ctx, memories, 90, y, imageTheme.width - 180, 360);
      y += 400;

      y = drawSectionTitle(ctx, '記憶の一覧', y);
      const sorted = [...(memories || [])].sort((a, b) => a.age - b.age);
      const contentW = imageTheme.width - 180;
      const gap = 18;
      const colW = (contentW - gap) / 2;
      const rowH = 82;
      const visible = sorted.slice(0, 8);

      if (!visible.length) {
        drawDarkCard(ctx, 90, y, contentW, 82);
        drawCanvasText(ctx, '記憶はまだ記録されていません。', 120, y + 26, contentW - 60, 26, { font: canvasFont(22), color: imageTheme.muted });
        y += 106;
      } else {
        visible.forEach((item, index) => {
          const col = index % 2;
          const row = Math.floor(index / 2);
          const cardX = 90 + col * (colW + gap);
          const cardY = y + row * rowH;
          drawDarkCard(ctx, cardX, cardY, colW, rowH - 12);
          ctx.font = canvasFont(20, '700');
          ctx.fillStyle = imageTheme.border;
          ctx.fillText(`${item.age}歳`, cardX + 20, cardY + 16);
          ctx.fillStyle = Number(item.satisfaction) >= 0 ? imageTheme.blue : imageTheme.red;
          ctx.fillText(`${Number(item.satisfaction) > 0 ? '+' : ''}${item.satisfaction}`, cardX + colW - 72, cardY + 16);
          drawCanvasText(ctx, item.event || '', cardX + 92, cardY + 14, colW - 178, 22, { font: canvasFont(18), color: imageTheme.text, maxLines: 2 });
        });
        y += Math.ceil(visible.length / 2) * rowH + 4;
        if (sorted.length > visible.length) {
          drawOverflowCount(ctx, `ほか ${sorted.length - visible.length} 件の記憶があります。`, 92, y);
          y += 32;
        }
      }

      y = drawSectionTitle(ctx, 'ライフラインを見て気づいたこと', y + 10);
      drawDarkCard(ctx, 90, y, contentW, 190);
      drawCanvasText(ctx, chartInsight || 'まだメモはありません。', 120, y + 24, contentW - 60, 28, { font: canvasFont(22), color: imageTheme.text, maxLines: 5 });
      drawFixedFooter(ctx);
      return canvas;
    };

    const createStatusExportImage = ({ player, cans, canInsight, allyInsight }) => {
      const canvas = createA4Canvas();
      const ctx = canvas.getContext('2d');
      let y = drawExportHeader(ctx, 'ステータス：Can', player);
      y = drawSectionTitle(ctx, '武器・魔法・仲間', y);

      const contentW = imageTheme.width - 180;
      const gap = 18;
      const cardW = (contentW - gap * 2) / 3;
      const cardH = 520;
      const groupY = y;

      ['skill', 'magic', 'ally'].forEach((type, index) => {
        const group = (cans || []).filter(c => c.type === type);
        const meta = canTypeMeta[type];
        const x = 90 + index * (cardW + gap);
        drawDarkCard(ctx, x, groupY, cardW, cardH);
        ctx.font = canvasFont(24, '700');
        ctx.fillStyle = type === 'skill' ? imageTheme.blue : type === 'magic' ? imageTheme.purple : imageTheme.green;
        ctx.fillText(meta.label, x + 22, groupY + 24);
        let innerY = groupY + 70;
        const visible = group.slice(0, 6);
        if (!visible.length) {
          drawCanvasText(ctx, '未記録', x + 22, innerY, cardW - 44, 26, { font: canvasFont(21), color: imageTheme.muted });
        } else {
          visible.forEach(item => {
            ctx.fillStyle = type === 'skill' ? imageTheme.blue : type === 'magic' ? imageTheme.purple : imageTheme.green;
            ctx.font = canvasFont(20, '700');
            ctx.fillText(`・${item.name}`, x + 22, innerY);
            innerY = drawCanvasText(ctx, item.desc || '説明なし', x + 42, innerY + 26, cardW - 64, 21, { font: canvasFont(17), color: imageTheme.muted, maxLines: 2 }) + 14;
          });
          if (group.length > visible.length) {
            drawOverflowCount(ctx, `ほか ${group.length - visible.length} 件`, x + 22, groupY + cardH - 38);
          }
        }
      });

      y = groupY + cardH + 36;
      y = drawSectionTitle(ctx, '気づき', y);
      const memoW = (contentW - gap) / 2;
      drawDarkCard(ctx, 90, y, memoW, 360);
      ctx.font = canvasFont(22, '700');
      ctx.fillStyle = imageTheme.border;
      ctx.fillText('武器・魔法から見えた気づき', 118, y + 26);
      drawCanvasText(ctx, canInsight || 'まだメモはありません。', 118, y + 68, memoW - 56, 27, { font: canvasFont(21), color: imageTheme.text, maxLines: 9 });

      const allyX = 90 + memoW + gap;
      drawDarkCard(ctx, allyX, y, memoW, 360);
      ctx.font = canvasFont(22, '700');
      ctx.fillStyle = imageTheme.border;
      ctx.fillText('仲間・関係性から見えた気づき', allyX + 28, y + 26);
      drawCanvasText(ctx, allyInsight || 'まだメモはありません。', allyX + 28, y + 68, memoW - 56, 27, { font: canvasFont(21), color: imageTheme.text, maxLines: 9 });

      drawFixedFooter(ctx);
      return canvas;
    };

    const createWillMustExportImage = ({ player, will, willTenYears, willOneYearInsight, willThreeYearsInsight, selectedMust, mustInsight }) => {
      const canvas = createA4Canvas();
      const ctx = canvas.getContext('2d');
      let y = drawExportHeader(ctx, '次なる冒険：Will / Quest', player);
      const contentW = imageTheme.width - 180;
      const gap = 18;

      y = drawSectionTitle(ctx, '次なる冒険：Will', y);
      drawDarkCard(ctx, 90, y, contentW, 410);
      ctx.font = canvasFont(22, '700');
      ctx.fillStyle = imageTheme.border;
      ctx.fillText('1年後', 120, y + 28);
      let innerY = drawCanvasText(ctx, will.oneYear || '未記録', 120, y + 62, contentW - 60, 25, { font: canvasFont(20), color: imageTheme.text, maxLines: 3 });
      ctx.fillStyle = imageTheme.border;
      ctx.font = canvasFont(22, '700');
      ctx.fillText('3年後', 120, innerY + 12);
      innerY = drawCanvasText(ctx, will.threeYears || '未記録', 120, innerY + 42, contentW - 60, 25, { font: canvasFont(20), color: imageTheme.text, maxLines: 3 });
      ctx.fillStyle = imageTheme.blue;
      ctx.font = canvasFont(24, '700');
      ctx.fillText(`目指すロール：${will.job || '未記録'}`, 120, innerY + 12);
      ctx.fillStyle = imageTheme.border;
      ctx.font = canvasFont(22, '700');
      ctx.fillText('10年後までに楽しみたいこと', 120, innerY + 50);
      drawCanvasText(ctx, (willTenYears || []).map(item => `・${item}`).join('\n') || '未記録', 120, innerY + 82, contentW - 60, 24, { font: canvasFont(19), color: imageTheme.text, maxLines: 5 });

      y += 446;
      const memoW = (contentW - gap) / 2;
      drawDarkCard(ctx, 90, y, memoW, 185);
      ctx.font = canvasFont(21, '700');
      ctx.fillStyle = imageTheme.border;
      ctx.fillText('1年後の気づき', 118, y + 24);
      drawCanvasText(ctx, willOneYearInsight || 'まだメモはありません。', 118, y + 62, memoW - 56, 24, { font: canvasFont(18), color: imageTheme.text, maxLines: 4 });
      const threeX = 90 + memoW + gap;
      drawDarkCard(ctx, threeX, y, memoW, 185);
      ctx.font = canvasFont(21, '700');
      ctx.fillStyle = imageTheme.border;
      ctx.fillText('3年後の気づき', threeX + 28, y + 24);
      drawCanvasText(ctx, willThreeYearsInsight || 'まだメモはありません。', threeX + 28, y + 62, memoW - 56, 24, { font: canvasFont(18), color: imageTheme.text, maxLines: 4 });

      y += 225;
      y = drawSectionTitle(ctx, 'ギルドからのクエスト：Must', y);
      const must = selectedMust || {};
      drawParchmentCard(ctx, 90, y, contentW, 455);
      ctx.fillStyle = imageTheme.brown;
      ctx.font = canvasFont(21, '700');
      ctx.fillText('接続したクエスト', 125, y + 28);
      ctx.fillStyle = imageTheme.ink;
      ctx.font = canvasFont(31, '700');
      drawCanvasText(ctx, must.title || '未選択', 125, y + 62, contentW - 70, 38, { font: canvasFont(31, '700'), color: imageTheme.ink, maxLines: 2 });
      let nextY = drawCanvasText(ctx, must.desc || '概要なし', 125, y + 142, contentW - 70, 27, { font: canvasFont(21), color: imageTheme.ink, maxLines: 4 });
      ctx.strokeStyle = imageTheme.parchmentBorder;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(125, nextY + 16);
      ctx.lineTo(imageTheme.width - 125, nextY + 16);
      ctx.stroke();
      ctx.fillStyle = imageTheme.brown;
      ctx.font = canvasFont(21, '700');
      ctx.fillText('Willとの接続メモ', 125, nextY + 38);
      nextY = drawCanvasText(ctx, must.connection || '未記録', 125, nextY + 74, contentW - 70, 25, { font: canvasFont(19), color: imageTheme.ink, maxLines: 5 });
      ctx.strokeStyle = imageTheme.parchmentBorder;
      ctx.beginPath();
      ctx.moveTo(125, nextY + 14);
      ctx.lineTo(imageTheme.width - 125, nextY + 14);
      ctx.stroke();
      ctx.fillStyle = imageTheme.brown;
      ctx.font = canvasFont(21, '700');
      ctx.fillText('接続してみた気づき', 125, nextY + 36);
      drawCanvasText(ctx, mustInsight || 'まだメモはありません。', 125, nextY + 72, contentW - 70, 25, { font: canvasFont(19), color: imageTheme.ink, maxLines: 5 });

      drawFixedFooter(ctx);
      return canvas;
    };
