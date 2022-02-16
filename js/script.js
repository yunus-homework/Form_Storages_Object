(function () {
  const formHandler = {
    formId: "form-example", // тут лежит Id с DOM
    formElement: null,

    getFormFromDOM() {
      const domEl = document.getElementById(this.formId);
      this.formElement = domEl; // тут присвоили formElement наш ID
    },

    setEvents() {
      this.formElement.addEventListener(
        //берём текущую форму и вешаем addE.
        "submit",
        this.formSubmitHandler.bind(this)
        //(event) => this.formSubmitHandler(event)
        //ставим правильный this, bind вернёт ссылку на новую
        // функцию копию функции с установленным контекстом, bind один раз
      ); //вызывается нельзя изменить bind в функции в которой уже вызывали

      document.addEventListener("DOMContentLoaded", this.fillForm.bind(this));
    },

    //это callback в addEventListener
    //event это объект который хранит в себе данные о событии
    formSubmitHandler(event) {
      event.preventDefault();

      //собираем данные с формы
      const data = event.target.querySelectorAll("input, select, textarea");
      const inputsData = {};

      for (const input of data) {
        //перебираем
        inputsData[input.name] = input.value; // наполняем inputsData
      }

      this.setData(inputsData);
    },

    fillForm(event) {
      if (!this.checkData) {
        return;
      } //если не checkData

      //а если есть то
      //после того как получили данные с localStorage нужно
      //в обратную сторону прокрутиться
      const data = this.getData();
      const inputs = this.formElement.querySelectorAll(
        "input, select, textarea"
      );

      for (const input of inputs) {
        input.value = data[input.name];
      }
    },

    //сохраняем в localStorage
    setData(data) {
      localStorage.setItem(this.formId, JSON.stringify(data));
      //JSON.stringify в виде строки
    },

    //получаем данные с localStorages
    getData() {
      return JSON.parse(localStorage.getItem(this.formId));
    },

    //проверяет если в localStorage данные
    checkData() {
      return localStorage.getItem(this.formId) ? true : false;
    },

    //вызывает методы по очереди
    init() {
      //this это этот объект как указатель
      this.getFormFromDOM();
      this.setEvents();
    },
  };

  formHandler.init();
})();
