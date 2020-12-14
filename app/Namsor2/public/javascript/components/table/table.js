const tablesGestion =
  (function () {

    const { byId, bySelector, addClass, removeClass } = domGestion;

    /*================================================================================================
                                            GESTION DES TABLEAUX
    =================================================================================================*/

    // ==================== Valeurs commnunes
    const DomElement = {
      dataArraySection: bySelector('.data-array-section'),
      tabPanelsContener: byId('tab-panels'),
      arrowPrev: byId('arrow-prev'),
      arrowNext: byId('arrow-next')
    }
    let formsNumber, tabPanelsPosition;


    /* ================================================================================================
                                        CONSTRUCTEUR DES TABLEAUX
    ==================================================================================================*/

    function Table(id) {
      this.id = id;
      this.infoArray = {};
      this.componentsDom = {};
    };


    // --------------------- Création du parent de Table -------------------//
    Table.prototype.createTableSection = function () {
      return (
        `<div class="table hide" id="table-section-${this.id}">
        <div class="title-table">
          <div class="flex">
            <h3> 
              ${dropzoneGestion.files[this.id].name} 
              <span class="secondary">${formsGestion.forms[this.id].fileSize}</span>
            </h3>
            <span class="download-button" id="upload-button-${this.id}"><img src="./public/media/img/time-capsule.gif" alt="wait" /></span>
            </div>
          <p>Type of data processing: ${formsGestion.forms[this.id].requestName}</p>
        </div>
        <div class="overflow">
          <table id="table-${this.id}"></table>
        </div>
      </div>`
      )
    };


    // --------------------- Création du TablePanel  -------------------//
    Table.prototype.createTablePanel = function () {
      return (
        `<div class="loading table-panel" id="table-panel-${this.id}">
        <div class="click-target" data-id="${this.id}">
          <p>${dropzoneGestion.files[this.id].name}</p>
          <img class="error-img" src="./public/media/img/exclamation.png" alt="download" />
          <img class="loading-img" src="./public/media/img/time-capsule-grey.gif" alt="loading" />
          <img class="notEnough-img" src="./public/media/img/coins.png" alt="credits missing" />
        </div>
      </div>`
      );
    };


    // --------------------- Insertion du parent de panel et du panelTable  -------------------//
    Table.prototype.insertTableElements = function () {
      DomElement.dataArraySection.insertAdjacentHTML('beforeend', this.createTableSection());
      DomElement.tabPanelsContener.insertAdjacentHTML('beforeend', this.createTablePanel());

      const tabPanel = byId(`table-panel-${this.id}`);
      this.componentsDom = {
        tableSection: byId(`table-section-${this.id}`),
        uploadButton: byId(`upload-button-${this.id}`),
        table: byId(`table-${this.id}`),
        tablePanel: tabPanel,
      };

      actionsGestion.tablePanelListener(tabPanel.querySelector('.click-target'));
    };




    // --------------------- Création et insertion du tableau -------------------//
    Table.prototype.insertTable = function (infoArray, sliceNumber) {
      const { table, tablePanel, tableSection } = this.componentsDom;
      const addId = formsGestion.forms[this.id].inputsValue.cols.id !== "auto";
      const newTable =
        `<thead>
        <tr>
          ${Object.keys(infoArray[0]).map((key) => {
          if (key === "id" && addId || key !== "id")
            return `<th>${key}</th>`
        }).join("")}
        </tr>
      </thead>
      <tbody>
        ${infoArray.map((row) =>
          `<tr>
              ${Object.entries(row).map(([key, value]) => {
            if (key === "id" && addId || key !== "id")
              return `<td>${value}</td>`
          }).join("")}
          </tr>`
        ).join("")}
      </tbody>`

      table.insertAdjacentHTML('afterbegin', newTable);
      removeClass(tablePanel, "loading");

      if (sliceNumber) {
        const sliceMessage = `
        <div class="sliceMessage">
          <p>You do not have enough credits to fully process this file. ${sliceNumber} lines 
          out of ${formsGestion.forms[this.id].parsingData.totalLignes} in total were processed. To see more, please purchase credits.</p>
          <button id="buy" class="button-green">buy credits</button>
        </div>
        `;
        tableSection.insertAdjacentHTML('beforeend', sliceMessage);
      };

      if (!tablesReady) {
        removeClass(tableSection, "hide");
        addClass(tablePanel, "actif");
        tablesReady++;
      };
    };


    // --------------------- Mise à jour en cas d'erreur -------------------//
    Table.prototype.updateError = function (error) {
      const { uploadButton, table, tablePanel, tableSection } = this.componentsDom;
      uploadButton.innerHTML = `<img src="./public/media/img/${error ? "exclamation.png" : "coins.png"}" alt="error with your file" />`;
      table.innerHTML = error ?
        "<p>We have a problem with your file. The credits for processing this file have not been debited. Check the format or information entered and try again.</p>"
        : `<div class="flex buy-credits">
          <p>You do not have enough credits to process this file, please acquire credits and start over.</p>
          <a id="buy" class="button-green" href="#" target="_blank" rel="noopener">buy credits</a>
        </div>`;
      removeClass(tablePanel, 'loading');
      addClass(tablePanel, error ? 'error' : 'notEnough');
      if (!tablesReady) {
        removeClass(tableSection, "hide");
        addClass(tablePanel, "actif");
        tablesReady++;
      };
    };


    // --------------------- Mise à jour du bouton download -------------------//
    Table.prototype.updateDownloadLink = function (json) {
      const fileFormat = dropzoneGestion.files[this.id].type === "text/plain" ? "text/plain" : "text/csv";
      let csvContent = `data:${fileFormat};charset=utf-8,${json}`;
      csvContent = encodeURI(csvContent);
      let download = json ?
        `<a class="download-link" href=${csvContent} download="${dropzoneGestion.files[this.id].name}"><img src="./public/media/img/download.svg" alt="download" /></a>` :
        '<img src="./public/media/img/exclamation.png" alt="download" />'
      this.componentsDom.uploadButton.innerHTML = download;
    };





    /* ================================================================================================
                              FONCTIONS ET OBJETS PUBLIC DE GESTION DES TABLEAUX
    ==================================================================================================*/


    /* ========= Liste des instances de Tables ===========*/
    const tables = {};
    let tablesReady;


    /* ========= Determiner si arrows des tablesPanel sont visibles ===========*/
    const showHideArrows = () => {
      let maxTabPanels = Math.floor((screen.width - 304) / 160);
      maxTabPanels = maxTabPanels < 1 ? 1 : maxTabPanels;
      let flag = !(maxTabPanels < formsNumber);
      if (maxTabPanels < formsNumber && !flag) {
        removeClass(DomElement.arrowPrev, 'hide');
        removeClass(DomElement.arrowNext, 'hide');
        flag = true;
      } else if (flag) {
        DomElement.tabPanelsContener.style.transform = "translateX(0)";
        addClass(DomElement.arrowPrev, 'hide');
        addClass(DomElement.arrowNext, 'hide');
        flag = false;
      };
    };


    /* ========= Décaler tablPanels avec arrow ===========*/
    const moveTabPanels = function () {
      const direction = this.direction === "next" ? 1 : - 1;
      let maxTabPanels = Math.floor((screen.width - 304) / 160);
      maxTabPanels = maxTabPanels < 1 ? 1 : maxTabPanels;
      const maxNext = formsNumber - maxTabPanels;
      tabPanelsPosition = (tabPanelsPosition + direction) > maxNext ? maxNext : (tabPanelsPosition + direction) < 0 ? 0 : tabPanelsPosition + direction;
      if (tabPanelsPosition === 0) addClass(DomElement.arrowPrev, 'invisible');
      else removeClass(DomElement.arrowPrev, 'invisible');
      if (tabPanelsPosition === maxNext) addClass(DomElement.arrowNext, 'invisible');
      else removeClass(DomElement.arrowNext, 'invisible');
      DomElement.tabPanelsContener.style.transform = `translateX(${-tabPanelsPosition * 162}px)`;
    }

    /* ========= Création des instances Tables ===========*/
    const createTablesElements = () => {
      formsNumber = Object.keys(formsGestion.forms).length;
      tabPanelsPosition = 0;
      showHideArrows();
      tablesReady = 0;
      Object.keys(formsGestion.forms).forEach(id => {
        tables[id] = new Table(id);
        tables[id].insertTableElements();
      });
    };


    /* ========= Affichage d'une autres instances de Tables ===========*/
    const newActiveTable = event => {
      const target = event.currentTarget.dataset.id;
      Object.values(tables).forEach(table => {
        if (table.id === target) {
          removeClass(table.componentsDom.tableSection, "hide");
          addClass(table.componentsDom.tablePanel, "actif");
        } else {
          addClass(table.componentsDom.tableSection, "hide");
          removeClass(table.componentsDom.tablePanel, "actif");
        };
      });
    };



    return { showHideArrows, moveTabPanels, createTablesElements, newActiveTable, tables }

  })();