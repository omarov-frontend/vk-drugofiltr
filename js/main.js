const API_VK_ID = 7739054;

function vkLogin() {
    return new Promise((resolve, reject) => {
        // инициализируем приложение
        VK.init({
            apiId: API_VK_ID
        });

        // авторизовываемся
        VK.Auth.login(data => {
            // если не удалось соединиться
            if (data.status !== "connected") {
                reject();
            } else {
                // если соединение удалось
                resolve();
            }
        }, 2) // метка 2 - получение информации о друзьях
    })
}

function renderFriends(friends, listElement) {
    let result = '<ul class="friends-list">';

    for(let i = 0; i < friends.length; i++) {
        result += `
        <li class="friends-list__item">
            <img class="friends-list__img" src="${ friends[i].photo_200 }" alt="Image">
            <div class="friends-list__name">${ friends[i].first_name + ' ' + friends[i].last_name }</div>
            <button class="friends-list__btn friends-list__btn_remove"></button>
        </li>
        `
    }

    result += '</ul>';

    listElement.innerHTML = result;
}

vkLogin().then(function() {
    // успех
    VK.api(
        'friends.get',
        {
            v: '5.62',
            fields: ['city', 'photo_200']
        },
        function(data) {
            const sourceList = document.querySelector('#source-list');
            renderFriends(data.response.items, sourceList);
        }
    );
}).catch(function() {
    // ошибка
})
