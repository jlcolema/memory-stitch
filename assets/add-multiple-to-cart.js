function addMultipleToCart() {
  if (!multipleProjectToggle) return;

  document.querySelector('#AddToCart-All').addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelectorAll('.validation-message').forEach(elem => elem.remove());

    const lastEmbroiderCheck = document.querySelectorAll('[name=embroidered_message]')[document.querySelectorAll('[name=embroidered_message]').length - 1];

    if (lastEmbroiderCheck.checked) {
      let validInput = '';

      const lineInputs = document.querySelectorAll('.line-inputs input');

      for (let i = 0; i < lineInputs.length; i++) {
        if (lineInputs[i].value) {
          validInput = lineInputs[i].value;
          break;
        }
      }

      if (!validInput) {
        const validationMessage = document.createElement('div');
        validationMessage.classList.add('validation-message');
        validationMessage.textContent = 'Embroidery message lines cannot be blank';

        document.querySelector('#AddToCart-All').before(validationMessage);
        e.target.closest('#AddToCart-All').classList.remove('clicked');
        return;
      }
    }

    function hasDuplicateProjectNames(arr) {
      const filteredArr = arr.filter(obj => obj !== null);
      const projectNames = filteredArr.map(obj => obj.projectName);
      const uniqueProjectNames = new Set(projectNames);

      return uniqueProjectNames.size < projectNames.length;
    }

    if (e.target.closest('#AddToCart-All').classList.contains('clicked')) return;
    e.target.closest('#AddToCart-All').classList.add('clicked');

    const cartLength = cartObjectArray.length;
    const projectNames = document.querySelectorAll('input[name="project_name"]');
    const lastProjectName = projectNames[projectNames.length - 1];
    const cutTshirts = document.querySelectorAll('input[name="cut_tshirts"]');
    const lastCutTshirt = cutTshirts[cutTshirts.length - 1];
    const embroideredMessages = document.querySelectorAll('input[name="embroidered_message"]');
    const lastEmbroideredMessage = embroideredMessages[embroideredMessages.length - 1];
    const rushProductions = document.querySelectorAll('input[name="rush_production"]');
    const lastRushProduction = rushProductions[rushProductions.length - 1];
    const priceItems = document.querySelectorAll('.price-item.price-item--regular');
    const lastPriceItem = priceItems[priceItems.length - 1];
    const componentIds = document.querySelectorAll('div[data-component-id]');
    const lastComponentId = componentIds[componentIds.length - 1];

    let alreadyInObj = false;

    cartObjectArray.forEach(obj => {
      if (!obj?.componentNumber) return;
      if (obj?.componentNumber?.toString() === lastComponentId?.getAttribute('data-component-id')?.toString()) {
        alreadyInObj = true;
      }
    });

    if (alreadyInObj) {
      if (hasDuplicateProjectNames(cartObjectArray)) {
        const validationMessage = document.createElement('div');
        validationMessage.classList.add('validation-message');
        validationMessage.textContent = 'Project names must be unique.'

        document.querySelector('#AddToCart-All').before(validationMessage);
        e.target.closest('#AddToCart-All').classList.remove('clicked');
        return;
      }

      e.target.closest('#AddToCart-All').querySelector('#AddToCartText-All').textContent = 'ADDING TO CART...';

      cartObjectArray.forEach((obj, index) => {
        let cutVal = '';
        let embVal = '';
        let rushVal = '';
        let boldVariantNames = [];
        let boldVariantIds = [];
        let boldProductIds = [];
        let boldProductPrices = [];
        let cutShirtPrice = document.querySelectorAll('input[name="cut_tshirts"]')[0]?.value?.replace('$', '')?.replace('.', '') || '0';
        let embroideredPrice = document.querySelectorAll('input[name="embroidered_message"]')[0]?.value?.replace('$', '')?.replace('.', '') || '0';
        let rushPrice = document.querySelectorAll('input[name="rush_production"]')[0]?.value?.replace('$', '')?.replace('.', '') || '0';

        if (obj.cutShirt) {
          cutVal = "✓";
          boldVariantNames.push("Let us cut your t-shirts");
          boldVariantIds.push("15908425793602");
          boldProductIds.push("1927414251586");
          boldProductPrices.push(cutShirtPrice);
        }

        if (obj.embroidered) {
          embVal = "✓";
          boldVariantNames.push("Add an embroidered message");
          boldVariantIds.push("15908563812418");
          boldProductIds.push("1927414251586");
          boldProductPrices.push(embroideredPrice);
        }

        if (obj.rushProduction) {
          rushVal = "✓";
          boldVariantNames.push("Rush Production ");
          boldVariantIds.push("15378342838338");
          boldProductIds.push("1927414251586");
          boldProductPrices.push(rushPrice);
        }

        let requestData;

        if (obj.embroidered) {
          requestData = {
            "form_type": 'product',
            "utf8": "✓",
            "id": obj.variantId,
            "option-1": obj.color,
            "option-2": obj.color,
            "properties": {
              "Project Name": obj.projectName + ((cutVal !== '' || embVal !== '') ? ' |' : ''),
              "Let us cut your t-shirts": cutVal,
              "Add an embroidered message": embVal,
              "Color": obj.fontColor,
              "Font": obj.fontFace,
              "Line 1": obj.lineOne,
              "Line 2": obj.lineTwo,
              "Line 3": obj.lineThree,
              "Rush Production ": rushVal,
              "_boldVariantNames": boldVariantNames.join(','),
              "_boldVariantIds": boldVariantIds.join(','),
              "_boldProductIds": boldProductIds.join(','),
              "_boldVariantPrices": boldProductPrices.join(','),
              "_boldBuilderId": `memorystitch_9a0bf1159f79c6ab0660ec422f350445}`,
              "_boldOptionLocalStorageId": `${obj.variantId}_${index}`,
            },
            "quantity": "1",
            "add": "",
          };
        } else {
          requestData = {
            "form_type": 'product',
            "utf8": "✓",
            "id": obj.variantId,
            "option-1": obj.color,
            "option-2": obj.color,
            "properties": {
              "Project Name": obj.projectName + ((cutVal !== '' || embVal !== '' || rushVal !== '') ? ' |' : ''),
              "Let us cut your t-shirts": cutVal,
              "Add an embroidered message": embVal,
              "Rush Production ": rushVal,
              "_boldVariantNames": boldVariantNames.join(','),
              "_boldVariantIds": boldVariantIds.join(','),
              "_boldProductIds": boldProductIds.join(','),
              "_boldVariantPrices": boldProductPrices.join(','),
              "_boldBuilderId": `memorystitch_9a0bf1159f79c6ab0660ec422f350445}`,
              "_boldOptionLocalStorageId": `${obj.variantId}_${index}`,
            },
            "quantity": "1",
            "add": "",
          };
        }
        setTimeout(() => {
          $.ajax({
            url: 'https://memorystitch.com/cart/add.js',
            type: 'POST',
            data: JSON.stringify(requestData),
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
            },
            error: function (error) {
              console.error(error);
            }
          });
        }, (1000 * index));
      });

      window.location = '/cart';
      return;
    }

    function getLastLineValue(lineNumber) {
      const lines = document.querySelectorAll(`input[name="line_${lineNumber}"]`);
      const lastLine = lines[lines.length - 1];
      return lastLine.value.trim();
    }

    function getLastSingleOptionSelectorTextContent(selectorIndex) {
      const singleOptionSelectors = document.querySelectorAll(`.SingleOptionSelector-${selectorIndex}`);
      const lastSingleOptionSelector = singleOptionSelectors[singleOptionSelectors.length - 1];
      return lastSingleOptionSelector.value.trim();
    }

    const regex = /(?:\?|&)variant=(\d+)/;
    const url = window.location.href;
    const match = url.match(regex);

    if (match && match[1]) {
      variantId = match[1];
    } else {
      console.log('Variant ID not found');
    }

    const lastFontColor = document.querySelectorAll('select[name="color"]')[document.querySelectorAll('select[name="color"]').length - 1];
    const lastFontFace = document.querySelectorAll('select[name="font"]')[document.querySelectorAll('select[name="font"]').length - 1];

    const newCompRegPrice = document.querySelectorAll('.price-item.price-item--regular')[document.querySelectorAll('.price-item.price-item--regular').length - 1].textContent.trim();
    const newCompSalePrice = document.querySelectorAll('.price-item.price-item--sale')[document.querySelectorAll('.price-item.price-item--sale').length - 1].textContent.trim();

    cartObjectArray[cartLength] = {
      projectName: lastProjectName.value?.trim() || "Untitled Project",
      cutShirt: lastCutTshirt.checked,
      embroidered: lastEmbroideredMessage.checked,
      lineOne: getLastLineValue(1),
      lineTwo: getLastLineValue(2),
      lineThree: getLastLineValue(3),
      rushProduction: lastRushProduction.checked,
      price: (window.toggleRegular === true) ? newCompRegPrice : newCompSalePrice,
      panelSize: getLastSingleOptionSelectorTextContent(0),
      quiltSize: getLastSingleOptionSelectorTextContent(1),
      color: document.querySelectorAll('.swatch input:checked+label')[0]?.closest('div')?.getAttribute('data-value')?.trim() || '',
      variantId: variantId,
      componentNumber: Number(lastComponentId?.getAttribute('data-component-id')),
      fontColor: lastFontColor.value.trim(),
      fontFace: lastFontFace.value.trim(),
    }

    if (hasDuplicateProjectNames(cartObjectArray)) {
      const validationMessage = document.createElement('div');
      validationMessage.classList.add('validation-message');
      validationMessage.textContent = 'Project names must be unique.'

      document.querySelector('#AddToCart-All').before(validationMessage);
      e.target.closest('#AddToCart-All').classList.remove('clicked');
      return;
    }

    e.target.closest('#AddToCart-All').querySelector('#AddToCartText-All').textContent = 'ADDING TO CART...';

    cartObjectArray.forEach((obj, index) => {
      if (!obj?.variantId) return;
      let cutVal = '';
      let embVal = '';
      let rushVal = '';
      let boldVariantNames = [];
      let boldVariantIds = [];
      let boldProductIds = [];
      let boldProductPrices = [];
      let cutShirtPrice = document.querySelectorAll('input[name="cut_tshirts"]')[0]?.value?.replace('$', '')?.replace('.', '') || '0';
      let embroideredPrice = document.querySelectorAll('input[name="embroidered_message"]')[0]?.value?.replace('$', '')?.replace('.', '') || '0';
      let rushPrice = document.querySelectorAll('input[name="rush_production"]')[0]?.value?.replace('$', '')?.replace('.', '') || '0';

      if (obj.cutShirt) {
        cutVal = "✓";
        boldVariantNames.push("Let us cut your t-shirts");
        boldVariantIds.push("15908425793602");
        boldProductIds.push("1927414251586");
        boldProductPrices.push(cutShirtPrice);
      }

      if (obj.embroidered) {
        embVal = "✓";
        boldVariantNames.push("Add an embroidered message");
        boldVariantIds.push("15908563812418");
        boldProductIds.push("1927414251586");
        boldProductPrices.push(embroideredPrice);
      }

      if (obj.rushProduction) {
        rushVal = "✓";
        boldVariantNames.push("Rush Production ");
        boldVariantIds.push("15378342838338");
        boldProductIds.push("1927414251586");
        boldProductPrices.push(rushPrice);
      }

      let requestData;

      if (obj.embroidered) {
        requestData = {
          "form_type": 'product',
          "utf8": "✓",
          "id": obj.variantId,
          "option-1": obj.color,
          "option-2": obj.color,
          "properties": {
            "Project Name": obj.projectName + ((cutVal !== '' || embVal !== '') ? ' |' : ''),
            "Let us cut your t-shirts": cutVal,
            "Add an embroidered message": embVal,
            "Color": obj.fontColor,
            "Font": obj.fontFace,
            "Line 1": obj.lineOne,
            "Line 2": obj.lineTwo,
            "Line 3": obj.lineThree,
            "Rush Production ": rushVal,
            "_boldVariantNames": boldVariantNames.join(','),
            "_boldVariantIds": boldVariantIds.join(','),
            "_boldProductIds": boldProductIds.join(','),
            "_boldVariantPrices": boldProductPrices.join(','),
            "_boldBuilderId": `memorystitch_9a0bf1159f79c6ab0660ec422f350445}`,
            "_boldOptionLocalStorageId": `${obj.variantId}_${index}`,
          },
          "quantity": "1",
          "add": "",
        };
      } else {
        requestData = {
          "form_type": 'product',
          "utf8": "✓",
          "id": obj.variantId,
          "option-1": obj.color,
          "option-2": obj.color,
          "properties": {
            "Project Name": obj.projectName + ((cutVal !== '' || embVal !== '' || rushVal !== '') ? ' |' : ''),
            "Let us cut your t-shirts": cutVal,
            "Add an embroidered message": embVal,
            "Rush Production ": rushVal,
            "_boldVariantNames": boldVariantNames.join(','),
            "_boldVariantIds": boldVariantIds.join(','),
            "_boldProductIds": boldProductIds.join(','),
            "_boldVariantPrices": boldProductPrices.join(','),
            "_boldBuilderId": `memorystitch_9a0bf1159f79c6ab0660ec422f350445}`,
            "_boldOptionLocalStorageId": `${obj.variantId}_${index}`,
          },
          "quantity": "1",
          "add": "",
        };
      }

      setTimeout(() => {
        $.ajax({
          url: 'https://memorystitch.com/cart/add.js',
          type: 'POST',
          data: JSON.stringify(requestData),
          contentType: 'application/json',
          dataType: 'json',
          success: function (response) {
            if (index + 1 === cartObjectArray.length) {
              setTimeout(() => {
                window.location = '/cart';
              }, 1000);
            }
          },
          error: function (error) {
            console.error(error);
            if (index + 1 === cartObjectArray.length) {
              setTimeout(() => {
                window.location = '/cart';
              }, 1000);
            }
          }
        });
      }, (1000 * index));
    });
  });
}

addMultipleToCart();
