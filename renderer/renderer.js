let visibled = false

// メニューを閉じる
const closeMenu = () => {
    const menuList = document.getElementById("menu-list").children;
    for(const menu of [...menuList]){
        if(menu.classList.contains("visibled")){
            menu.classList.remove("visibled")
        }
    }
    visibled = false
}

const menuButtonClickCommonModule = (name) => {
    const button = document.getElementById(`button-${name}`)
    const menu = document.getElementById(`menu-${name}`)
    menu.style.left = `${button.offsetLeft}px`

    const menuVisible = (mouseover) => {
        const menu = document.getElementById(`menu-${name}`)
        if (menu.classList.contains("visibled")) {
            if(!mouseover){
                menu.classList.remove("visibled")
            }
        } else {
            closeMenu()
            menu.classList.add("visibled")
            visibled = true;
        }
    }

    button.addEventListener("click", () => {
        menuVisible(false)
    });

    button.addEventListener("mouseover", () => {
        if (visibled) menuVisible(true)
    })
}

// メニューボタンの登録
const registerMenuButton = (list) => {
    for(const e of list){
        menuButtonClickCommonModule(e)
    }
}

// メニューボタンの登録
registerMenuButton(["file", "edit"])

// ウィンドウ内をクリックしたとき
document.body.addEventListener("click", (e) => {
    // console.log(e.target)
    if(!e.target.classList.contains("menu-button-component")){
        closeMenu();
        return;
    }
})

// const information = document.getElementById('info')
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
