const reg = document.getElementById("reg");
    reg.addEventListener("click",e => {
        e.preventDefault();
        regist();
    });
    var login = document.getElementById("log");
    var city = document.getElementById("city");
    var age = document.getElementById("age");
    var pas1 = document.getElementById("pas1");
    var pas2 = document.getElementById("pas2");


async function regist()
{
    var hash = CryptoJS.SHA256(pas1.value).toString();
    if(await checkForms()) {
        const response = fetch("api/users", {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    login: login.value,
                    city: city.value,
                    age: age.value,
                    password: hash
                })
            });
        alert("Регистрация успешно завершена");
    }
}

function HidePas()
{
    var pas1 = document.getElementById("pas1");
    var pas2 = document.getElementById("pas2");
    if(pas1.getAttribute('type') == 'password'){
        pas1.removeAttribute('type');
        pas1.setAttribute('type','text');
        pas2.removeAttribute('type');
        pas2.setAttribute('type','text');
    }
    else {
        pas1.removeAttribute('type');
        pas1.setAttribute('type','password');
        pas2.removeAttribute('type');
        pas2.setAttribute('type','password');
    }
}
async function checkForms()
{
    var lul = 1;
    let users = await GetUsers();
    users.forEach(us => {
        if(us.login == login.value){
        lul = 0;
        } 
    });
    if(lul == 0){
        alert("Данный логин уже используется");
        return 0;
    }
    if( login.value == '' ||
    city.value == '' ||
    age.value == '' ||
    pas1.value == '' ||
    pas2.value == '')
    {
        alert("Заполните все формы");
        return  0;
    }
    if (pas1.value != pas2.value){
        alert("Введенные пароли не совпадают");
        return  0;
    }
    if((/\D/).test(age.value)){
        alert("Укажите корректный возраст");
        return  0;
    }
    return 1;;
}
    async function GetUsers() {
            // отправляет запрос и получаем ответ
            const response = await fetch("/api/users", {
                method: "GET",
                headers: { "Accept": "application/json" }
            });
            // если запрос прошел нормально
            if (response.ok === true) {
                // получаем данные
                const users = await response.json();
                return Promise.resolve(users);
            };
    }
    async function signIn(){
        let users = await GetUsers();
        let log = document.getElementById("login");
        let pas = document.getElementById("password");
        hash_pas = CryptoJS.SHA256(pas.value).toString();
        let flag = 0;
        users.forEach(us => {
            if(us.login == log.value && us.password == hash_pas){
                flag = 1;
                alert("Вы вошли в систему");
                let infoLog = document.getElementById("log2");
                infoLog.innerText = "Логин: " + us.login;
                let infoCity = document.getElementById("city2");
                infoCity.innerText = "Город: " + us.city;
                let infoAge = document.getElementById("age2");
                infoAge.innerText = "Возраст: " + us.age;
            }         
        })
        if(flag == 0)
            alert("Пароль или логин неверен");
    }