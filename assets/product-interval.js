function toggleCheckboxInputs() {
  let cutShirtToggle = false;
  let embroideredToggle = false;
  let rushToggle = false;
  document.querySelectorAll('#component-template .bold_option_checkbox label').forEach(checkboxLabel => {
    if (checkboxLabel.textContent.trim().includes('cut your t-shirts')) {
      cutShirtToggle = true;
    }
    if (checkboxLabel.textContent.trim().includes('an embroidered message')) {
      embroideredToggle = true;
    }
    if (checkboxLabel.textContent.trim().includes('Rush Production')) {
      rushToggle = true;
    }
  });

  document.querySelectorAll('input[name="cut_tshirts"]').forEach(input => {
    if (!cutShirtToggle) {
      input.closest('label').classList.add('hidden')
      document.querySelectorAll('.tshirt-more-info').forEach(elem => elem.classList.add('hidden'));
    } else {
      input.closest('label').classList.remove('hidden');
      document.querySelectorAll('.tshirt-more-info').forEach(elem => elem.classList.remove('hidden'));
    }
  });

  document.querySelectorAll('input[name="embroidered_message"]').forEach(input => {
    if (!embroideredToggle) {
      input.closest('label').classList.add('hidden');
      document.querySelectorAll('.embroider-more-info').forEach(elem => elem.classList.add('hidden'));
    } else {
      input.closest('label').classList.remove('hidden');
      document.querySelectorAll('.embroider-more-info').forEach(elem => elem.classList.remove('hidden'));
    }
  });

  document.querySelectorAll('input[name="rush_production"]').forEach(input => {
    if (!rushToggle) {
      input.closest('label').classList.add('hidden')
      document.querySelectorAll('.rush-more-info').forEach(elem => elem.classList.add('hidden'));
    } else {
      input.closest('label').classList.remove('hidden')
      document.querySelectorAll('.rush-more-info').forEach(elem => elem.classList.remove('hidden'));
    }
  });
}

function setCheckboxValues() {
  let tshirtValue = '';
  let embroideredValued = '';
  let rushValue = '';

  document.querySelectorAll('#component-template .bold_option_checkbox label').forEach(label => {
    if (label.innerHTML.includes('Let us cut your t-shirts')) {
      if (label.querySelector('.bold_option_value_price')) {
        tshirtValue = label.querySelector('.bold_option_value_price').textContent.trim();
      }
    }
    if (label.innerHTML.includes('embroidered message')) {
      if (label.querySelector('.bold_option_value_price')) {
        embroideredValued = label.querySelector('.bold_option_value_price').textContent.trim();
      }
    }
    if (label.innerHTML.includes('Rush Production')) {
      if (label.querySelector('.bold_option_value_price')) {
        rushValue = label.querySelector('.bold_option_value_price').textContent.trim();
      }
    }
  });

  document.querySelectorAll('input[name="cut_tshirts"]').forEach(input => {
    const content = input.closest('label').querySelector('div').textContent;
    if (content.trim().includes('$') || !tshirtValue) return;
    input.setAttribute('value', tshirtValue.replace('$', ''));
    input.closest('label').querySelector('div').textContent = content.trim().replace('Let us cut your t-shirts', `Let us cut your t-shirts ${tshirtValue}`);
  });

  document.querySelectorAll('input[name="embroidered_message"]').forEach(input => {
    const content = input.closest('label').querySelector('div').textContent;
    if (content.trim().includes('$') || !embroideredValued) return;
    input.setAttribute('value', embroideredValued.replace('$', ''));
    input.closest('label').querySelector('div').textContent = content.trim().replace('Add an embroidered message', `Add an embroidered message ${embroideredValued}`);
  });

  document.querySelectorAll('input[name="rush_production"]').forEach(input => {
    const content = input.closest('label').querySelector('div').textContent;
    if (content.trim().includes('$') || !rushValue) return;
    input.setAttribute('value', rushValue.replace('$', ''));
    input.closest('label').querySelector('div').textContent = content.trim().replace('Rush Production', `Rush Production ${rushValue}`);
  });
}

function hideElements() {
  document.querySelectorAll('.selector-wrapper').forEach(elem => {
    if (elem.innerHTML.includes('Minky Fleece Backing Color')) {
      elem.style.display = 'none';
    }
  });
}

function correctTooltips() {
  document.querySelectorAll('.tooltip-text').forEach(elem => {
    if (!elem.closest('.name-input-tooltip-wrapper')) {
      const labelText = elem.closest('.selector-wrapper').querySelector('label').textContent.split('Question')[0].trim();
      const productTitle = `{{ product.title }}`;

      if (labelText === 'Style') {
        if (!elem.classList.contains('style-text-added')) {
          elem.classList.add('style-text-added');
          elem.textContent = 'Please select an option for how you would like us to put together your project. Choose from sashing options, as well as whether you would like batting and/or long-arm quilting included.';
        }
      }

      if (labelText === 'Select Quilt Size') {
        if (productTitle === 'Kids T-Shirt Quilts') {
          if (!elem.classList.contains('quilt-text-added')) {
            elem.classList.add('quilt-text-added');
            elem.textContent = 'How many t-shirts you’re able to send will determine how large of a quilt you’re able to create. Please make sure you have enough shirts for the quilt size you select!';
          }
        }
        if (productTitle === 'Onesie Quilts') {
          if (!elem.classList.contains('quilt-text-added')) {
            elem.classList.add('quilt-text-added');
            elem.textContent = 'How many onesies you’re able to send will determine how large of a quilt you’re able to create. Please make sure you have enough onesies for the quilt size you select!';
          }
        }
      }

      if (labelText === 'Select Pillow Size') {
        if (!elem.classList.contains('pillow-text-added')) {
          elem.classList.add('pillow-text-added');
          elem.textContent = 'How many t-shirts you’re able to send will determine how large of a pillow you’re able to create. Please make sure you have enough shirts for the pillow size you select!';
        }
      }

      if (labelText === 'Size') {
        if (productTitle === 'T-Shirt Pillow Cases') {
          if (!elem.classList.contains('pillow-text-added')) {
            elem.classList.add('pillow-text-added');
            elem.textContent = 'This is the size your finished pillowcase will be. Please make sure you have enough shirts for the pillow size you select!';
          }
        }
      }
    }
  });
}

// function priceUpdater() {
//   if (!differencePrice) {
//     regularPrice = document.querySelector('[data-regular-price]').textContent.trim().replace('$', '');
//     salePrice = document.querySelector('[data-sale-price]').textContent.trim().replace('$', '');
//     differencePrice = (Number(regularPrice) - Number(salePrice)).toFixed(2);
//
//     if (regularPrice !== salePrice) {
//       differencePrice = (Number(regularPrice) - Number(salePrice)).toFixed(2);
//     } else {
//       differencePrice = '0';
//     }
//   }
//
//   if (differencePrice !== '0') {
//     const dataSalePriceElems = document.querySelectorAll('[data-sale-price]');
//     if (dataSalePriceElems.length) {
//       dataSalePriceElems.forEach(elem => {
//         const currentPrice = document.querySelector('[data-regular-price]').textContent.trim().replace('$', '');
//         elem.textContent = `$${(Number(currentPrice) - Number(differencePrice)).toFixed(2)}`;
//       });
//     }
//
//     const priceRecalcElems = document.querySelectorAll('.price-recalc');
//
//     if (priceRecalcElems.length) {
//       priceRecalcElems.forEach(elem => {
//         if (elem.classList.contains('adjusted')) return;
//         elem.classList.add('adjusted');
//         const currentValue = elem.textContent.trim().replace('$', '');
//         elem.textContent = `$${(Number(currentValue) - Number(differencePrice)).toFixed(2)}`;
//       });
//     }
//   }
// }

function saveButtonDisplay() {
  document.querySelectorAll('.edit-save-btn').forEach((button, index) => {
    if (document.querySelector('.custom-quilt-component.edit-mode')) {
      button.classList.remove('hidden');
    } else {
      button.classList.add('hidden');
    }
  });
}

function subtotalSection() {
  const toNumber = priceString => parseFloat(priceString.trim().replace('$', ''));

  const getLastElement = nodeList => nodeList[nodeList.length - 1];

  const salePriceElems = document.querySelectorAll('.price-item.price-item--sale');
  const regularPriceElems = document.querySelectorAll('.price-item.price-item--regular');
  const lastSalePriceElem = getLastElement(salePriceElems);
  const lastRegularPriceElem = getLastElement(regularPriceElems);

  const componentContainer = document.querySelector('#components-container');

  cartObjectArray.forEach(item => {
    if (!item?.componentNumber) return;

    const componentNumber = item.componentNumber.toString();
    const dataContainer = componentContainer.querySelector(`[data-container="${componentNumber}"]`);
    if (dataContainer) {
      dataContainer.querySelector('.price-recalc').textContent = item.price.toString();
    }
  });

  if (typeof window.initialValueEqual === 'undefined') {
    window.initialValueEqual = lastSalePriceElem.textContent.trim() === lastRegularPriceElem.textContent.trim();
  }

  const currentItemPrice = window.initialValueEqual
    ? toNumber(lastRegularPriceElem.textContent.trim())
    : toNumber(lastSalePriceElem.textContent.trim());

  const currentSubtotalPrice = Array.from(document.querySelectorAll('.price-recalc'))
    .reduce((subtotal, priceElem) => subtotal + toNumber(priceElem.textContent.trim()), 0);

  const totalPrice = (currentItemPrice + currentSubtotalPrice).toFixed(2);

  document.querySelector('.custom-subtotal-field').innerHTML = `
    <div style="display:flex;align-items:center;">
      <div style="margin-right:6px;font-weight:700;font-size:16px;">Subtotal:</div>
      <div style="margin-right:6px;font-size:16px;">$${totalPrice}</div>
    </div>`;
}

function resetURLParams() {
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);

  const paramNames = ['utm_source', 'utm_medium', 'utm_campaign'];

  paramNames.forEach(name => {
    if (window[name + '_param'] && params.get(name) !== window[name + '_param']) {
      params.set(name, window[name + '_param']);
    }
  });

  url.search = params.toString();

  history.replaceState({}, '', url.toString());
}

function runIntervals() {
  if (!multipleProjectToggle) return;

  setInterval(() => {
    resetURLParams();
    toggleCheckboxInputs();
    setCheckboxValues();
    hideElements();
    correctTooltips();
    saveButtonDisplay();
    subtotalSection();
  }, 150);
}

runIntervals();

