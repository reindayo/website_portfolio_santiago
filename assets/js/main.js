(function () {
  'use strict';

  var root = document.documentElement;
  var storageKey = 'portfolio-theme';
  var themeEventName = 'portfolio:themechange';

  function readStoredTheme() {
    try {
      var value = window.localStorage.getItem(storageKey);
      return value === 'dark' || value === 'light' ? value : null;
    } catch (error) {
      return null;
    }
  }

  function persistTheme(theme) {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (error) {}
  }

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  var themeToggle = document.getElementById('theme-toggle');
  var themeLabel = themeToggle ? themeToggle.querySelector('[data-theme-label]') : null;

  function syncThemeToggle(theme) {
    if (!themeToggle) {
      return;
    }
    var dark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
    if (themeLabel) {
      themeLabel.textContent = dark ? 'THEME: BLUEPRINT' : 'THEME: PAPER';
    }
  }

  function applyTheme(theme, options) {
    var settings = options || {};
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    syncThemeToggle(theme);
    if (settings.persist) {
      persistTheme(theme);
    }
    document.dispatchEvent(new CustomEvent(themeEventName, { detail: { theme: theme } }));
  }

  syncThemeToggle(currentTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', { persist: true });
    });
  }

  if (window.matchMedia) {
    var colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    var handleColorScheme = function (event) {
      if (readStoredTheme()) {
        return;
      }
      applyTheme(event.matches ? 'dark' : 'light');
    };
    if (colorScheme.addEventListener) {
      colorScheme.addEventListener('change', handleColorScheme);
    } else if (colorScheme.addListener) {
      colorScheme.addListener(handleColorScheme);
    }
  }

  var docViewer = document.querySelector('[data-doc-viewer]');
  if (docViewer) {
    var tabs = Array.prototype.slice.call(docViewer.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(docViewer.querySelectorAll('[role="tabpanel"]'));

    var selectTab = function (tab, shouldFocus) {
      var targetId = tab.getAttribute('data-tab-target') || tab.getAttribute('aria-controls');
      tabs.forEach(function (item) {
        var isActive = item === tab;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-selected', isActive ? 'true' : 'false');
        item.setAttribute('tabindex', isActive ? '0' : '-1');
      });
      panels.forEach(function (panel) {
        var isActive = panel.id === targetId;
        panel.classList.toggle('is-active', isActive);
        panel.hidden = !isActive;
      });
      if (shouldFocus) {
        tab.focus();
      }
    };

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        selectTab(tab);
      });
      tab.addEventListener('keydown', function (event) {
        var nextIndex = null;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          nextIndex = (index + 1) % tabs.length;
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === 'Home') {
          nextIndex = 0;
        } else if (event.key === 'End') {
          nextIndex = tabs.length - 1;
        }
        if (nextIndex === null) {
          return;
        }
        event.preventDefault();
        selectTab(tabs[nextIndex], true);
      });
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-copy-email]'), function (button) {
    button.addEventListener('click', function () {
      var email = button.getAttribute('data-copy-email') || '';
      var status = button.parentElement ? button.parentElement.querySelector('.copy-status') : null;

      var report = function (message) {
        if (status) {
          status.textContent = message;
        }
      };

      var legacyCopy = function () {
        var field = document.createElement('textarea');
        field.value = email;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.top = '-9999px';
        document.body.appendChild(field);
        field.select();
        var copied = false;
        try {
          copied = document.execCommand('copy');
        } catch (error) {
          copied = false;
        }
        document.body.removeChild(field);
        return copied;
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(function () {
          report('Email copied to clipboard.');
        }).catch(function () {
          report(legacyCopy() ? 'Email copied to clipboard.' : 'Copy failed. Select the address manually.');
        });
      } else {
        report(legacyCopy() ? 'Email copied to clipboard.' : 'Copy failed. Select the address manually.');
      }
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll('[data-current-year]'), function (element) {
    element.textContent = String(new Date().getFullYear());
  });

  var canvas = document.getElementById('blueprint-canvas');
  if (canvas && canvas.getContext) {
    var context = canvas.getContext('2d');
    if (context) {
      var frame = 0;

      var readVar = function (name, fallback) {
        var value = window.getComputedStyle(root).getPropertyValue(name);
        return value && value.trim() ? value.trim() : fallback;
      };

      var crosshair = function (x, y, size, color, alpha) {
        var cx = Math.round(x) + 0.5;
        var cy = Math.round(y) + 0.5;
        context.save();
        context.globalAlpha = alpha;
        context.strokeStyle = color;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(cx, cy - size);
        context.lineTo(cx, cy + size);
        context.moveTo(cx - size, cy);
        context.lineTo(cx + size, cy);
        context.stroke();
        context.restore();
      };

      var ring = function (x, y, radius, color, alpha) {
        context.save();
        context.globalAlpha = alpha;
        context.strokeStyle = color;
        context.lineWidth = 1;
        context.beginPath();
        context.arc(Math.round(x) + 0.5, Math.round(y) + 0.5, radius, 0, Math.PI * 2);
        context.stroke();
        context.restore();
      };

      var drawGrid = function (width, height, major, minor, rule, faint) {
        var drawLines = function (step, color) {
          var offset;
          context.strokeStyle = color;
          context.beginPath();
          for (offset = step; offset < width; offset += step) {
            var x = Math.round(offset) + 0.5;
            context.moveTo(x, 0);
            context.lineTo(x, height);
          }
          for (offset = step; offset < height; offset += step) {
            var y = Math.round(offset) + 0.5;
            context.moveTo(0, y);
            context.lineTo(width, y);
          }
          context.stroke();
        };

        context.save();
        context.lineWidth = 1;
        drawLines(minor, faint);
        drawLines(major, rule);
        context.restore();
      };

      var draw = function () {
        frame = 0;
        var rect = canvas.getBoundingClientRect();
        var width = rect.width;
        var height = rect.height;
        if (!width || !height) {
          return;
        }

        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var pixelWidth = Math.round(width * dpr);
        var pixelHeight = Math.round(height * dpr);
        if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
          canvas.width = pixelWidth;
          canvas.height = pixelHeight;
        }
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        context.clearRect(0, 0, width, height);

        var copper = readVar('--sienna', '#E06D44');
        var teal = readVar('--teal', '#2BB69B');
        var rule = readVar('--rule-major', 'rgba(38, 49, 61, 0.9)');
        var faint = readVar('--rule-faint', 'rgba(38, 49, 61, 0.5)');
        var rootStyle = window.getComputedStyle(root);
        var baseSize = parseFloat(rootStyle.fontSize) || 16;
        var major = baseSize * 6;
        var minor = baseSize * 1.5;

        drawGrid(width, height, major, minor, rule, faint);

        context.save();
        context.globalAlpha = 0.5;
        context.strokeStyle = faint;
        context.lineWidth = 1;
        context.setLineDash([2, 6]);
        var axisX = Math.round(width / 2) + 0.5;
        var axisY = Math.round(height / 2) + 0.5;
        context.beginPath();
        context.moveTo(axisX, 0);
        context.lineTo(axisX, height);
        context.moveTo(0, axisY);
        context.lineTo(width, axisY);
        context.stroke();
        context.restore();

        var x;
        var y;
        for (x = major; x < width; x += major) {
          for (y = major; y < height; y += major) {
            crosshair(x, y, 4, rule, 0.45);
          }
        }

        var cornerInset = Math.min(major, Math.max(minor * 2, 48));
        var nodes = [
          { x: cornerInset, y: cornerInset, color: copper },
          { x: width - cornerInset, y: cornerInset, color: teal },
          { x: cornerInset, y: height - cornerInset, color: teal },
          { x: width - cornerInset, y: height - cornerInset, color: copper }
        ];

        nodes.forEach(function (node) {
          crosshair(node.x, node.y, 11, node.color, 0.6);
          ring(node.x, node.y, 4, node.color, 0.6);
        });

        canvas.classList.add('is-rendered');
      };

      var scheduleDraw = function () {
        if (frame) {
          window.cancelAnimationFrame(frame);
        }
        frame = window.requestAnimationFrame(draw);
      };

      window.addEventListener('resize', scheduleDraw, { passive: true });
      document.addEventListener(themeEventName, scheduleDraw);
      if (window.ResizeObserver) {
        new window.ResizeObserver(scheduleDraw).observe(canvas);
      }
      if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
        document.fonts.ready.then(scheduleDraw).catch(function () {});
      }
      scheduleDraw();
    }
  }
}());
