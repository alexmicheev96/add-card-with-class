"use strict";
// tabs//
document.addEventListener('DOMContentLoaded', () => {

    const tabContent = document.querySelectorAll('.tabcontent'),
          tabItem = document.querySelectorAll('.tabheader__item'),
          tabsItems = document.querySelector('.tabheader__items');

   function hiddenTabContent() {
        tabContent.forEach( item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
    });

        tabItem.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
   } 

   function showTabContent(i = 0) { 
    tabContent[i].classList.add('show', 'fade');
    tabContent[i].classList.remove('hide');
    tabItem[i].classList.add('tabheader__item_active');
   }

   tabsItems.addEventListener('click', (ev) => {
        const target = ev.target;
        if(target&&target.classList.contains('tabheader__item')) {
            tabItem.forEach((item, i) => {
                if(target == item) {
                    hiddenTabContent();
                    showTabContent(i);
                };
            });
        };
   });

   hiddenTabContent();
   showTabContent();
   //timer//

   const deadLine = '2021-12-7';           // определяет дедлайн
   function getTimeRemaining(endtime) {

       const t = Date.parse(endtime) - Date.parse(new Date()),   // задача функции получить разницу между датами превращаем стору в числовом значении количемтво мс в конечном времени  //
            days = Math.floor(t / (1000 * 60 * 60 * 24)),                     //окугрелие до ближайшего целого
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),    // делим аргумент на 24 и получаем остаток от деления//
            minute = Math.floor((t / (1000 * 60) % 60)),
            second = Math.floor((t / 1000) % 60);

        return {
            'total' : t,
            days,
            hours,
            minute,
            second
        };
   }

   function getZero (num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;                      // добавляет ноль когда значение меньше 10//
    } else {
        return num;
    }
   }

   function setClock(selector, endtime) {

       const timer = document.querySelector(selector),                    // для того чтобы таймер был универсальным для любого сайта//
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),                // получили все элементы со страницы
            minute = timer.querySelector('#minutes'),
            second = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();   //убирает мигание верстки функция инициализации установит текущую дату и затем уже будет работать setInterval//

        function updateClock() {

            const t = getTimeRemaining(endtime);          //возвращает в нашу функцию обьект который получился в функции getTimeRemainig

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minute.innerHTML = getZero(t.minute);
            second.innerHTML = getZero(t.second);

            if (t.total <= 0) {                                        //если setInterval меньше ноля то произойдет остановка таймера
                clearInterval(timeInterval);
            }
        }
   }
    setClock('.timer' , deadLine);


    // modal window//


    const btnCallback = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[modal-close]');
    
    function openModal() {
        modalWindow.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    btnCallback.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
     
   
    function closeModal() {
        modalWindow.classList.toggle('show');
        document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);  // передаем только имя потому что она будет вызвана только после клика//
    modalWindow.addEventListener('click', (e) => {
        if(e.target === modalWindow) {
            closeModal();
        }    
    }); 

    document.addEventListener('keydown' , (e) => {
        if(e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal();
        }
    }); 
    


    // let scrollDown = document.documentElement.scrollTop;
    // console.log(scrollDown);

    // function showModalWindowAfterScroll () {
    //     if(scrollDown >= 900) {
    //         modalWindow.classList.toggle('show');
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         closeModal()
    //     }
    // }
    // showModalWindowAfterScroll();

    // const modalTimerId = setTimeout(openModal, 5000);

    // function showModalByScroll() {
    //     if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
    //         openModal();
    //         window.removeEventListener('scroll' , showModalByScroll);
    //     }
    // }

    // window.addEventListener('scroll' , showModalByScroll);     //не забыть потом раскоментировать модалку с формой обратной связи//

    //используем классы для карточек//

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 27;  //конвертация валюты//
            this.parent = document.querySelector(parentSelector);
            this.changeTOGrivn();  //вернет значение цены уже конвертированное в доллорах , которое будет в рассчиано данном методе//
        }

        changeTOGrivn() {
            this.price *= this.transfer;
        }

        render() {
            const elem = document.createElement('span');
            elem.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> $/день</div>
                    </div>
            </div>
            `;    //вызовом метода создаем структуру которая будет помещаться в определенный div//
            this.parent.append(elem);
        }

    }

    const item1 = new MenuCard(
        "img/tabs/vegy.jpg",
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();
     //не объявляем константу длясоздания нового обьекта//
    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        5,
        '.menu .container'
    ).render();
    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        4,
        '.menu .container'
    ).render();
});
