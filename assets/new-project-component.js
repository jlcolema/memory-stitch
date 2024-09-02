function newProjectComponent() {
  if (!multipleProjectToggle) return;

  const template = document.getElementById('component-template');
  const componentsContainer = document.getElementById('components-container');
  const addToCartButton = document.getElementById('AddToCartText-All');

  const regex = /(?:\?|&)variant=(\d+)/;
  const url = window.location.href;
  const match = url.match(regex);

  if (match && match[1]) {
    variantId = match[1];
  } else {
    console.log('Variant ID not found');
  }

  function updateAddToCartButtonText(edit) {
    let componentCount = 1;
    if (edit) componentCount = 0;

    cartObjectArray.forEach(obj => {
      if (!obj?.componentNumber) return;
      componentCount = componentCount + 1;
    });

    if (componentCount > 1) {
      addToCartButton.innerText = `Add (${componentCount} Items) To Cart`;
    } else {
      addToCartButton.innerText = `Add To Cart`;
    }
  }

  function changeVariant(newVariant) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    params.set('variant', newVariant);

    url.search = params.toString();

    history.replaceState({}, '', url.toString());
  }

  function reactivateComponent(box) {
    const newCompNumber = box.querySelector('[data-container]').getAttribute('data-container');
    box.nextElementSibling.querySelector('div[data-component-id]').setAttribute('data-component-id', newCompNumber);

    let cutTshirtsCheckbox;
    let embroideredCheckbox;
    let rushProductionCheckbox;

    document.querySelectorAll('#component-template .bold_option_checkbox label input[type="checkbox"]').forEach(checkbox => {
      const labelContent = checkbox.closest('label').querySelector('.bold_option_title').textContent;
      if (labelContent.includes('cut your t-shirts')) {
        cutTshirtsCheckbox = checkbox;
      }
      if (labelContent.includes('embroidered message')) {
        embroideredCheckbox = checkbox;
      }
      if (labelContent.includes('Rush Production')) {
        rushProductionCheckbox = checkbox;
      }
    });

    if (cutTshirtsCheckbox?.checked) cutTshirtsCheckbox.click();
    if (embroideredCheckbox?.checked) embroideredCheckbox.click();
    if (rushProductionCheckbox?.checked) rushProductionCheckbox.click();

    let selectedColor;
    let variantValue;

    cartObjectArray.forEach(obj => {
      if (!obj?.componentNumber) return;
      if (obj.componentNumber.toString() === box?.nextElementSibling.querySelector('div[data-component-id]').getAttribute('data-component-id').toString()) {
        variantValue = obj.variantId;
        selectedColor = obj.color;

        if (obj?.cutShirt && cutTshirtsCheckbox) cutTshirtsCheckbox.click();
        if (obj?.embroidered && embroideredCheckbox) embroideredCheckbox.click();
        if (obj?.rushProduction && rushProductionCheckbox) rushProductionCheckbox.click();
      }
    });

    box.nextElementSibling.querySelectorAll('.color.swatch-element').forEach(swatch => {
      if (swatch.getAttribute('data-value') === selectedColor) {
        swatch.querySelector('label').click();
      }
    });

    const optionSelector0 = box.nextElementSibling.querySelector('.SingleOptionSelector-0');
    const optionSelector1 = box.nextElementSibling.querySelector('.SingleOptionSelector-1');
    const optionSelector2 = box.nextElementSibling.querySelector('.SingleOptionSelector-2');

    if (optionSelector0) optionSelector0.dispatchEvent(new Event('change', {bubbles: true}));
    if (optionSelector1) optionSelector1.dispatchEvent(new Event('change', {bubbles: true}));
    if (optionSelector2) optionSelector2.dispatchEvent(new Event('change', {bubbles: true}));

    changeVariant(variantValue);

    box.nextElementSibling.style.display = 'block';
    componentsContainer.removeChild(box);
  }

  let componentNumber = 1;

  function addComponent(isInitialComponent) {

    const newComponent = template.cloneNode(true);
    newComponent.style.display = 'block';
    newComponent.classList.add('component');
    newComponent.classList.add('custom-quilt-component');
    newComponent.setAttribute('id', `${newComponent.getAttribute('id')}-${componentNumber}`);
    componentNumber = componentNumber + 1;
    newComponent.querySelectorAll('.added-listeners').forEach((elem, index) => {
      elem.classList.remove('added-listeners');
    });

    newComponent.querySelector('.project-name-input').value = `My New Project ${componentNumber - 1}`;

    const findElementsAndSync = () => {
      const customCutTshirtsCheckboxes = document.querySelectorAll('input[name="cut_tshirts"]');
      const cutTshirtsCheckbox = document.querySelectorAll('#component-template .bold_option_checkbox label')[0];
      const customEmbroideredCheckboxes = document.querySelectorAll('input[name="embroidered_message"]');
      const embroideredCheckbox = document.querySelectorAll('#component-template .bold_option_checkbox label')[1];
      const customRushProductionCheckboxes = document.querySelectorAll('input[name="rush_production"]');
      const rushProductionCheckbox = document.querySelectorAll('#component-template .bold_option_checkbox label')[2];

      if (cutTshirtsCheckbox && customCutTshirtsCheckboxes.length > 0) {
        customCutTshirtsCheckboxes.forEach(box => {
          if (box.closest('#component-template')) return;
          if (box.classList.contains('custom-sync')) return;
          box.classList.add('custom-sync');
          box.addEventListener('click', () => {
            document.querySelectorAll('#component-template .bold_option_checkbox label').forEach(label => {
              if (label.textContent.trim().includes('cut your t-shirts')) {
                label.click();
              }
            });
          });
        });
        customEmbroideredCheckboxes.forEach(box => {
          if (box.closest('#component-template')) return;
          if (box.classList.contains('custom-sync')) return;
          box.classList.add('custom-sync');
          box.addEventListener('click', () => {
            document.querySelectorAll('#component-template .bold_option_checkbox label').forEach(label => {
              if (label.textContent.trim().includes('an embroidered message')) {
                label.click();
              }
            });
          });
        });
        customRushProductionCheckboxes.forEach(box => {
          if (box.closest('#component-template')) return;
          if (box.classList.contains('custom-sync')) return;
          box.classList.add('custom-sync');
          box.addEventListener('click', () => {
            document.querySelectorAll('#component-template .bold_option_checkbox label').forEach(label => {
              if (label.textContent.trim().includes('Rush Production')) {
                label.click();
              }
            });
          });
        });
        return true;
      }
      return false;
    };

    const intervalId = setInterval(() => {
      if (findElementsAndSync()) {
        clearInterval(intervalId);
      }
    }, 100);

    // Change the form element to a div for all non-original components
    const formElement = newComponent.querySelector('form');
    const divElement = document.createElement('div');
    while (formElement.firstChild) {
      divElement.appendChild(formElement.firstChild);
    }
    formElement.parentNode.replaceChild(divElement, formElement);

    let originalBodyStyle = document.body.style.cssText;

    function disableScroll() {
      let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      document.body.style.cssText = `
    position: fixed;
    width: 100%;
    top: -${scrollPosition}px;
    overflow: hidden;
  `;
    }

    function enableScroll() {
      let scrollPosition = Math.abs(parseInt(document.body.style.top || '0'));
      document.body.style.cssText = originalBodyStyle;
      window.scrollTo(0, scrollPosition);
    }

    const selectElements = newComponent.querySelectorAll('select');
    selectElements.forEach((selectElement) => {
      const idValue = selectElement.getAttribute('id');
      Array.from(selectElement.attributes).forEach(attribute => {
        selectElement.removeAttribute(attribute.name);
        selectElement.classList.add(idValue);
      });

      // Add event listener for 'change' event
      selectElement.addEventListener('change', (event) => {
        const changedSelect = event.target;
        const matchingIdSelect = document.getElementById(changedSelect.classList[0]);

        if (matchingIdSelect) {
          matchingIdSelect.value = changedSelect.value;
          const changeEvent = new Event('change', {bubbles: true});

          disableScroll();
          matchingIdSelect.dispatchEvent(changeEvent);
          enableScroll();
        }
      });

      selectElement.selectedIndex = 0;

      let event = new Event('change');
      disableScroll();
      selectElement.dispatchEvent(event);
      enableScroll();
    });

    const shopPayMessage = newComponent.querySelector('shopify-payment-terms');
    const componentPriceField = newComponent.querySelector('.home_product_price > h4');
    componentPriceField.after(shopPayMessage);

    const componentId = document.createElement('div');
    componentId.style.display = 'none';
    componentId.setAttribute('data-component-id', componentNumber);
    componentPriceField.after(componentId);

    if (!isInitialComponent) {
      const addAnotherMessage = document.createElement('div');
      addAnotherMessage.classList.add('add-another-message');
      addAnotherMessage.innerHTML = `<div style="font-size:25px;font-family: Gotham Rounded,serif;font-weight:300;">Add Another Project</div><div style="margin-bottom: 15px;">Enter the details for your next project below</div>`;
      componentPriceField.before(addAnotherMessage);
    }

    const checkInputStatus = (currentInput, prevInput) => {
      if (prevInput && prevInput.value.length === 0) {
        currentInput.value = '';
        currentInput.disabled = true;
      } else {
        currentInput.disabled = false;
      }
    };

    const createCounter = () => {
      const counter = document.createElement('span');
      counter.style.marginLeft = '6px';
      return counter;
    };

    const updateCounter = (input, counter, maxLength) => {
      const currentLength = input.value.length;
      counter.textContent = `${currentLength}/${maxLength}`;
    };

    const lineInputsContainer = document.createElement('div');
    lineInputsContainer.classList.add('line-inputs');
    lineInputsContainer.style.display = 'none';

    const maxLength = 30;
    lineInputsContainer.innerHTML = `
      <div style="display:flex;flex-direction: column;">
        <label style="margin-top: 20px;margin-bottom: 6px;max-width:300px;font-size: 15px;font-weight: 400;color: #525252;font-family: Gotham Rounded,serif;">
        Color: 
          <select name="color">
            <option value="">-- Choose Color --</option>
            <option value="White" selected>White</option>
          </select>
        </label>
      <label style="margin-top: 6px;margin-bottom: 0;max-width:300px;font-size: 15px;font-weight: 400;color: #525252;font-family: Gotham Rounded,serif;">
        Font: 
          <select name="font">
            <option value="">-- Choose Font --</option>
            <option value="Block" selected>Block</option>
          </select>
        </label>
      </div>
      <br>
      <label style="margin-bottom: 6px;">Line 1: <input type="text" name="line_1" maxlength="${maxLength}"></label>
      <label style="margin-bottom: 6px;">Line 2: <input type="text" name="line_2" maxlength="${maxLength}"></label>
      <label style="margin-bottom: 6px;">Line 3: <input type="text" name="line_3" maxlength="${maxLength}"></label>
    `;

    const embroideredMessageLabel = newComponent.querySelector('input[name="embroidered_message"]').closest('label');
    embroideredMessageLabel.after(lineInputsContainer);

    const inputs = lineInputsContainer.querySelectorAll('input[type="text"]');
    inputs.forEach((input, index) => {
      const counter = createCounter();
      input.parentElement.appendChild(counter);
      updateCounter(input, counter, maxLength);

      // Disable the input if it's not the first one and the previous input is empty
      if (index !== 0) {
        const prevInput = inputs[index - 1];
        checkInputStatus(input, prevInput);
      }

      input.addEventListener('input', () => {
        updateCounter(input, counter, maxLength);

        // Check the next input's status when the current input changes
        if (index < inputs.length - 1) {
          const nextInput = inputs[index + 1];
          checkInputStatus(nextInput, input);
        }
      });
    });

    // Add a change event listener to the "embroidered_message" checkbox
    const embroideredMessageCheckbox = newComponent.querySelector('input[name="embroidered_message"]');
    embroideredMessageCheckbox.addEventListener('change', () => {
      if (embroideredMessageCheckbox.checked) {
        lineInputsContainer.style.display = 'block';
      } else {
        lineInputsContainer.style.display = 'none';
      }
    });

    componentsContainer.appendChild(newComponent);
    updateAddToCartButtonText(false);

    const removeButton = document.createElement('div');
    removeButton.className = 'remove-component-btn';
    removeButton.innerHTML = `<span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="11px" height="11px" viewBox="0 0 11 11" version="1.1">
              <title>Group</title>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                  <g id="D-Update-Adding" transform="translate(-1112.000000, -595.000000)" stroke="#B25337" stroke-width="2">
                      <g id="Group" transform="translate(1113.000000, 596.000000)">
                          <line x1="0" y1="0" x2="8.28184796" y2="9" id="Path-4"></line>
                          <line x1="0" y1="0" x2="8.28184796" y2="9" id="Path-4" transform="translate(4.140924, 4.500000) scale(-1, 1) translate(-4.140924, -4.500000) "></line>
                      </g>
                  </g>
              </g>
          </svg></span><span style="font-size:18px;font-weight:400;text-decoration:underline;">Remove</span>`;

    if (isInitialComponent) {
      removeButton.style.display = 'none';
    }

    componentPriceField.before(removeButton);
    removeButton.addEventListener('click', function (e) {
      document.querySelectorAll('.add-component-btn').forEach(btn => btn.style.display = 'flex');
      if (!e.target.classList.contains('edit')) {
        forcedRemove = true;
        newComponent.remove();
        updateAddToCartButtonText(true);

        const allRemoveBtns = document.querySelectorAll('.remove-btn');
        if (allRemoveBtns.length === 1) {
          allRemoveBtns[0].style.display = 'none';
        } else {
          allRemoveBtns.forEach(btn => btn.style.display = 'flex');
        }
      } else {
        const quiltParent = e.target.closest('.custom-quilt-component');
        quiltParent.querySelector('.edit-save-btn').click();

        let containerNumber = 0;

        document.querySelectorAll('div[data-container]').forEach(cont => {
          const thisContNumber = Number(cont.getAttribute('data-container'));
          if (thisContNumber > containerNumber) containerNumber = thisContNumber;
        });

        document.querySelectorAll('div[data-container]').forEach(cont => {
          const thisContNumber = Number(cont.getAttribute('data-container'));
          if (containerNumber.toString() === thisContNumber.toString()) {
            cont.querySelector('.remove-btn').click();
          }
        });
      }
    });

    const saveButton = document.createElement('div');
    saveButton.className = 'edit-save-btn';
    saveButton.classList.add('hidden');
    saveButton.innerHTML = '<div>Save</div>';

    newComponent.querySelector('.PUT_THIS_IN_LOOP').append(saveButton);
    saveButton.addEventListener('click', function () {
      document.querySelector('#AddToCart-All').style.display = 'flex';

      if (!document.querySelector('.remove-component-btn.edit')) {
        document.querySelectorAll('.add-component-btn')[document.querySelectorAll('.add-component-btn').length - 1].click();
        return;
      }

      cartObjectArray.forEach((obj, index) => {
        if (!obj?.componentNumber) return;
        if (obj.componentNumber.toString() === editComponentNumber.toString()) {
          cartObjectArray[index] = null;
        }
      });

      window.scrollTo({
        top: document.querySelector('h1').offsetTop,
        left: 0,
        behavior: 'smooth'
      });

      document.querySelectorAll('.remove-component-btn').forEach(btn => btn.classList.remove('edit'));

      newComponent.querySelector('.add-component-btn').click();
    });

    const panelTooltipElem = document.createElement('div');
    panelTooltipElem.classList.add('panel-input-tooltip-wrapper');
    const svgMarkup = `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             width="14px" height="14px" viewBox="0 0 14 14" version="1.1">
          <title>Question Mark</title>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="M-Update" transform="translate(-161.000000, -959.000000)">
              <g id="Question-Mark" transform="translate(161.000000, 958.000000)">
                <circle id="Oval" fill="#26AFC7" cx="7" cy="8" r="7"/>
                <text id="?" font-family="OpenSans-Extrabold, Open Sans" font-size="11"
                      font-weight="700"
                      fill="#FFFFFF">
                  <tspan x="4.44628906" y="12">?</tspan>
                </text>
              </g>
            </g>
          </g>
        </svg>
      `;
    panelTooltipElem.innerHTML = svgMarkup;

    const quiltTooltipElem = document.createElement('div');
    quiltTooltipElem.classList.add('quilt-input-tooltip-wrapper');
    quiltTooltipElem.innerHTML = svgMarkup;

    newComponent.querySelector('#selector-wrapper-0 label').append(panelTooltipElem);
    newComponent.querySelector('#selector-wrapper-1 label').append(quiltTooltipElem);

    const panelTooltipText = document.createElement('div');
    panelTooltipText.classList.add('tooltip-text');
    panelTooltipText.style.cssText = "display: none; position: absolute; background-color: white; padding: 8px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); z-index: 1;color:#000;font-size:14px;padding:10px;font-weight:300;bottom:30px;";
    panelTooltipText.textContent = "This is how big the squares on your quilt will be. Typically, you’ll want to select smaller panels if you have t-shirts in adult small or youth sizes.";
    panelTooltipElem.append(panelTooltipText);

    const panelTooltipModal = document.createElement('div');
    panelTooltipModal.classList.add('tooltip-modal');
    panelTooltipModal.style.cssText = "display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 16px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); z-index: 1000;width:75%;";
    panelTooltipModal.textContent = "This is how big the squares on your quilt will be. Typically, you’ll want to select smaller panels if you have t-shirts in adult small or youth sizes.";
    newComponent.appendChild(panelTooltipModal);

    const quiltTooltipText = document.createElement('div');
    quiltTooltipText.classList.add('tooltip-text');
    quiltTooltipText.style.cssText = "display: none; position: absolute; background-color: white; padding: 8px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); z-index: 1;color:#000;font-size:14px;padding:10px;font-weight:300;bottom:30px;";
    quiltTooltipText.textContent = "How many t-shirts you’re able to send will determine how large of a quilt you’re able to create. Please make sure you have enough shirts for the quilt size you select!";
    quiltTooltipElem.append(quiltTooltipText);

    const quiltTooltipModal = document.createElement('div');
    quiltTooltipModal.classList.add('tooltip-modal');
    quiltTooltipModal.style.cssText = "display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 16px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); z-index: 1000;width:75%;";
    quiltTooltipModal.textContent = "How many t-shirts you’re able to send will determine how large of a quilt you’re able to create. Please make sure you have enough shirts for the quilt size you select!";
    newComponent.appendChild(quiltTooltipModal);

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.style.cssText = "display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999;";
    newComponent.appendChild(overlay);

    const isMobile = () => window.innerWidth <= 768;

    panelTooltipElem.addEventListener('mouseenter', () => {
      if (!isMobile()) {
        panelTooltipText.style.display = 'block';
      }
    });

    panelTooltipElem.addEventListener('mouseleave', () => {
      if (!isMobile()) {
        panelTooltipText.style.display = 'none';
      }
    });

    panelTooltipElem.addEventListener('click', () => {
      if (isMobile()) {
        panelTooltipModal.style.display = 'block';
        overlay.style.display = 'block';
      }
    });

    quiltTooltipElem.addEventListener('mouseenter', () => {
      if (!isMobile()) {
        quiltTooltipText.style.display = 'block';
      }
    });

    quiltTooltipElem.addEventListener('mouseleave', () => {
      if (!isMobile()) {
        quiltTooltipText.style.display = 'none';
      }
    });

    quiltTooltipElem.addEventListener('click', () => {
      if (isMobile()) {
        quiltTooltipModal.style.display = 'block';
        overlay.style.display = 'block';
      }
    });

    overlay.addEventListener('click', () => {
      panelTooltipModal.style.display = 'none';
      quiltTooltipModal.style.display = 'none';
      overlay.style.display = 'none';
    });

    const addButton = newComponent.querySelector('.add-component-btn');
    addButton.addEventListener('click', function () {
      forcedRemove = false;

      let maxLineLength = 0;

      if (newComponent.querySelector('.embroider-validation')) {
        newComponent.querySelector('.embroider-validation').remove();
      }

      if (newComponent.querySelector('[name="embroidered_message"]').checked) {
        newComponent.querySelectorAll('.line-inputs input').forEach(input => {
          const inputLength = input.value.trim().length;
          if (inputLength > maxLineLength) {
            maxLineLength = inputLength;
          }
        });

        if (!maxLineLength) {
          const embroiderValidation = document.createElement('div');
          embroiderValidation.classList.add('embroider-validation');
          embroiderValidation.textContent = 'Embroidery message lines cannot be blank';

          newComponent.querySelector('.add-component-btn').before(embroiderValidation);
          return;
        }
      }

      window.scrollTo({
        top: document.querySelector('h1').offsetTop,
        left: 0,
        behavior: 'smooth'
      });

      if (document.querySelector('.custom-quilt-component.edit-mode')) {
        document.querySelectorAll('.remove-btn').forEach(remBtn => {
          remBtn.style.display = 'block';
        });
        document.querySelectorAll('.edit-btn').forEach(editBtn => {
          editBtn.style.display = 'block';
        });
        document.querySelectorAll('.edit-save-btn').forEach(editSvBtn => {
          editSvBtn.style.display = 'none';
        });
        document.querySelectorAll('.add-component-btn').forEach(addCompBtn => {
          addCompBtn.style.display = 'flex';
        });
        document.querySelectorAll('.custom-quilt-component.edit-mode').forEach(quiltContainer => {
          quiltContainer.classList.remove('edit-mode');
        });
      }
      const arrayIndex = componentNumber - 2;

      const regex = /(?:\?|&)variant=(\d+)/;
      const url = window.location.href;
      const match = url.match(regex);

      if (match && match[1]) {
        variantId = match[1];
      } else {
        console.log('Variant ID not found');
      }

      let quiltSizeInfo = newComponent.querySelector('.SingleOptionSelector-1').value.trim();
      const colorInfo = document.querySelectorAll('.swatch input:checked+label')[0]?.closest('div')?.getAttribute('data-value')?.trim() || '';

      console.log('colorInfo');
      console.log(colorInfo);

      if (newComponent.querySelector('.SingleOptionSelector-1').closest('#selector-wrapper-1').querySelector('label').textContent.trim().includes('Minky Fleece Backing Color')) {
        quiltSizeInfo = '';
      }

      const newCompRegPrice = newComponent.querySelector('.price-item.price-item--regular').textContent.trim();
      const newCompSalePrice = newComponent.querySelector('.price-item.price-item--sale').textContent.trim();

      cartObjectArray[arrayIndex] = {
        projectName: newComponent.querySelector('.project-name-input')?.value?.trim() || `Untitled Project`,
        cutShirt: newComponent.querySelector('input[name="cut_tshirts"]').checked,
        embroidered: newComponent.querySelector('input[name="embroidered_message"]').checked,
        lineOne: newComponent.querySelector('input[name="line_1"]').value.trim(),
        lineTwo: newComponent.querySelector('input[name="line_2"]').value.trim(),
        lineThree: newComponent.querySelector('input[name="line_3"]').value.trim(),
        rushProduction: newComponent.querySelector('input[name="rush_production"]').checked,
        price: (window.toggleRegular === true) ? newCompRegPrice : newCompSalePrice,
        panelSize: newComponent.querySelector('.SingleOptionSelector-0').value.trim(),
        quiltSize: quiltSizeInfo,
        color: colorInfo,
        variantId: variantId,
        componentNumber: componentNumber,
        fontColor: newComponent.querySelector('select[name="color"]').value.trim(),
        fontFace: newComponent.querySelector('select[name="font"]').value.trim(),
      };

      const cutTshirtsCheckbox = document.querySelectorAll('#component-template .bold_option_checkbox label input[type="checkbox"]')[0];
      const embroideredCheckbox = document.querySelectorAll('#component-template .bold_option_checkbox label input[type="checkbox"]')[1];
      const rushProductionCheckbox = document.querySelectorAll('#component-template .bold_option_checkbox label input[type="checkbox"]')[2];
      if (cutTshirtsCheckbox?.checked) cutTshirtsCheckbox.click();
      if (embroideredCheckbox?.checked) embroideredCheckbox.click();
      if (rushProductionCheckbox?.checked) rushProductionCheckbox.click();

      const box = document.createElement('div');
      box.className = 'project-box';
      box.innerHTML = `
                <div style="display:flex; flex-direction: row; width: 100%;background-color:#F8F4F4;border-radius: 5px;margin-bottom:12px;padding:15px;position:relative;" data-container=${componentNumber}>
                  <div style="width:25px;margin-right:5px;">
                    <div style="margin-top:10px;">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px" height="14px" viewBox="0 0 17 14" version="1.1">
                          <title>Path 5</title>
                          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                              <g id="D-Update-Adding" transform="translate(-758.000000, -522.000000)" stroke="#53AEC2" stroke-width="3">
                                  <polyline id="Path-5" points="760.144531 528.698361 764.865015 534 773.001674 524"></polyline>
                              </g>
                          </g>
                      </svg>
                    </div>
                  </div>
                  <div style="flex:1;">
                    <div style="display:flex;justify-content: space-between;">
                      <div style="font-weight:700;font-size:24px;margin-bottom: 5px;font-family: 'Gotham Rounded',serif;">
                        ${cartObjectArray[arrayIndex]?.projectName}
                      </div>
                      <div class="price-recalc" style="font-weight: 700;color:#20303C;font-family: 'Gotham Rounded',serif;">
                        ${cartObjectArray[arrayIndex]?.price}
                      </div>
                    </div>
                    <div style="display:flex;">
                      <div style="font-weight: 500;color:#525252;font-size: 14px;">
                        ${cartObjectArray[arrayIndex]?.panelSize}
                      </div>
                    </div>
                    <div style="display:${cartObjectArray[arrayIndex]?.quiltSize ? 'flex' : 'none'};">
                      <div style="font-weight: 500;color:#525252;font-size: 14px;">
                        ${cartObjectArray[arrayIndex]?.quiltSize}
                      </div>
                    </div>
                    <div style="display:flex;">
                      <div style="font-weight: 500;color:#525252;font-size: 14px;">
                        ${cartObjectArray[arrayIndex]?.color}
                      </div>
                    </div>
                    <div style="display:flex;position:absolute;bottom:10px;right:15px;">
                      <div class="remove-btn" style="margin-right:20px;font-size:18px;font-weight:400;">
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="11px" height="11px" viewBox="0 0 11 11" version="1.1">
                            <title>Group</title>
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                <g id="D-Update-Adding" transform="translate(-1112.000000, -595.000000)" stroke="#B25337" stroke-width="2">
                                    <g id="Group" transform="translate(1113.000000, 596.000000)">
                                        <line x1="0" y1="0" x2="8.28184796" y2="9" id="Path-4"></line>
                                        <line x1="0" y1="0" x2="8.28184796" y2="9" id="Path-4" transform="translate(4.140924, 4.500000) scale(-1, 1) translate(-4.140924, -4.500000) "></line>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        </span>
                        <span style="text-decoration: underline;">Remove</span>
                      </div>
                      <div class="edit-btn">
                        <span>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14px" height="14px" viewBox="0 0 14 14" version="1.1">
                            <title>Path 3</title>
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="D-Update-Adding" transform="translate(-1225.000000, -595.000000)" fill="#55AEC2">
                                    <polygon id="Path-3" points="1225.62207 608.659668 1226.34668 605.073242 1235.85547 595.897949 1238.28223 598.155273 1228.67383 607.931641"/>
                                </g>
                            </g>
                        </svg>
                        </span>
                        <span style="text-decoration: underline;">Edit</span>
                      </div>
                    </div>
                  </div>
                </div>`;

      box.querySelector('.remove-btn').addEventListener('click', function (e) {
        box.remove();
        newComponent.remove();

        const compNum = e.target.closest('div[data-container]').getAttribute('data-container');
        cartObjectArray.forEach((obj, index) => {
          if (!obj?.componentNumber) return;
          if (obj.componentNumber.toString() === compNum.toString()) {
            cartObjectArray[index] = null;
          }
        });

        const allRemoveComponentBtns = document.querySelectorAll('.remove-component-btn');
        if (allRemoveComponentBtns.length === 1) {
          allRemoveComponentBtns[0].style.display = 'none';
        } else {
          allRemoveComponentBtns.forEach(btn => btn.style.display = 'flex');
        }

        updateAddToCartButtonText(false);
      });

      box.querySelector('.edit-btn').addEventListener('click', function (e) {
        if (!document.querySelector('.custom-quilt-component.edit-mode')) {
          document.querySelector('#AddToCart-All').style.display = 'none';
          const customQuilts = document.querySelectorAll('.custom-quilt-component');
          const removeBtns = document.querySelectorAll('.remove-btn');
          const removeComponentBtns = document.querySelectorAll('.remove-component-btn');
          const editBtns = document.querySelectorAll('.edit-btn');
          const addCompBtns = document.querySelectorAll('.add-component-btn');
          const editSaveBtns = document.querySelectorAll('.edit-save-btn');

          customQuilts.forEach((quiltItem, index) => {
            quiltItem.classList.add('edit-mode');
            if (forcedRemove) return;
            if (index === customQuilts.length - 1) {
              quiltItem.remove();
            }
          });

          removeBtns.forEach(removeBtn => {
            removeBtn.style.display = 'none';
          });

          removeComponentBtns.forEach(btn => {
            btn.classList.add('edit');
            btn.style.display = 'flex';
          });

          editBtns.forEach(editBtn => {
            editBtn.style.display = 'none';
          });

          addCompBtns.forEach(addCompBtn => {
            addCompBtn.style.display = 'none';
          });

          editSaveBtns.forEach(editSaveBtn => {
            editSaveBtn.style.display = 'flex';
          });
        }
        editComponentNumber = e.target.closest('div[data-container]').getAttribute('data-container');
        updateAddToCartButtonText(true);
        reactivateComponent(box);
      });
      componentsContainer.insertBefore(box, newComponent);
      newComponent.style.display = 'none';
      addComponent(false);
    });
    newComponent.querySelectorAll('.swatch-container .swatch-element label').forEach(label => {
      label.addEventListener('click', e => {
        newComponent.querySelectorAll('.swatch-container .swatch-element label').forEach(elem => elem.style.border = 'none');
        e.target.closest('.swatch-element').querySelector('label').style.border = '4px solid #26B0C7';
      })
    });

    let currentIndex = 0;
    const initialVariantId = new URL(window.location.href).searchParams.get('variant');
    let currentVariantId = initialVariantId;
    let hasChanged = false;

    const clickAndCheckVariant = () => {
      if (!newComponent.querySelector('.swatch-container .swatch-element label') || !newComponent.querySelectorAll('.swatch-container .swatch-element label')[currentIndex]) return;
      newComponent.querySelectorAll('.swatch-container .swatch-element label')[currentIndex].click();

      currentIndex = (currentIndex + 1) % 3;
      currentVariantId = new URL(window.location.href).searchParams.get('variant');

      if (currentVariantId !== initialVariantId) {
        hasChanged = true;
      }

      if (hasChanged && currentIndex === 1) {
        clearInterval(clickInterval);
        newComponent.querySelectorAll('.swatch-container .swatch-element label').forEach(elem => elem.classList.remove('temporary-border-none'));
        window.newProjectConfig = true;
      }
    };

    let clickInterval

    if (!window.newProjectConfig) {
      newComponent.querySelectorAll('.swatch-container .swatch-element label').forEach(elem => elem.classList.add('temporary-border-none'));
      clickInterval = setInterval(clickAndCheckVariant, 100);
    } else {
      newComponent.querySelectorAll('.swatch-container .swatch-element label')[0].click();
    }
  }

  addComponent(true);
}

newProjectComponent();
