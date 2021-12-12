"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),   // список меню слева
          tabsContent = document.querySelectorAll('.tabcontent'),   // картинки
          tabsParent = document.querySelector('.tabheader__items');  // блок обьединяющий все itemы

    function hiddenTabContent() {
        tabsContent.forEach( item => {
            item.classList.add('hide');   // hidden tabs       добавляем класс скрытия и удаляем класс показа 
            item.classList.remove('show', 'fade');   // hidden tabs
        });

        tabs.forEach( item => {
            item.classList.remove('tabheader__item_active');      // здесь мы удаляем класс активности у наших пунктов списка
        });
    }

    function showTabContent (i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click' , (event) => {
        const target = event.target;

        if (target&&target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hiddenTabContent();
                    showTabContent(i);
                }
            });
        };
    });


    hiddenTabContent();
    showTabContent();
});

btnCallback.forEach(btn => {
    btn.addEventListener('click', () => {
        // modalWindow.classList.add('show');
        // modal.classList.remove('hide');
        modalWindow.classList.toggle('show');
        document.body.style.overflow = 'hidden';
    });
});
    

modalCloseBtn.addEventListener('click', () => {

    // modalWindow.classList.add('hide');
    // modal.classList.remove('show');
    modalWindow.classList.toggle('show');
    document.body.style.overflow = '';
});