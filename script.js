const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let expression = '';

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
          expression = '';
          display.value = '';
        } else if (value === '=') {
          try {
            // Replace custom operators with JS evaluable syntax
            let exp = expression
              .replace(/√/g, 'Math.sqrt')
              .replace(/sin/g, 'Math.sin')
              .replace(/cos/g, 'Math.cos')
              .replace(/tan/g, 'Math.tan')
              .replace(/log/g, 'Math.log')
              .replace(/\^/g, '**');
            // Evaluate the expression
            display.value = eval(exp);
            expression = display.value.toString();
          } catch (error) {
            display.value = 'Error';
            expression = '';
          }
        } else if (value === 'sqrt') {
          expression += 'Math.sqrt(';
          display.value += '√(';
        } else if (['sin', 'cos', 'tan', 'log'].includes(value)) {
          expression += value + '(Math.PI/180*';
          display.value += value + '(';
        } else {
          expression += value;
          display.value += value;
        }
      });
    });
