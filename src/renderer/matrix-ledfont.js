const getArduinoCodeCalc = (k) => {
    let dots1 = ""
    let dots2 = ""
    for(let j = 1; j <= 16; j++){
        let col = 0
        for(let i = 8; i > 0; i--){
            const dot = document.getElementById(`p${i}-${j + (k * 16)}`);            
            // console.log(dot)
            col <<= 1

            if(dot == null){
                console.log(k, i, j, dot)
            }

            if(dot.classList.contains("IsOn")){
                col |= 1
            }
        }
        dots1 += `${col},`
    }

    for(let j = 1; j <= 16; j++){
        let col = 0
        for(let i = 16; i > 8; i--){
            const dot = document.getElementById(`p${i}-${j + (k * 16)}`);            
            col <<= 1
            if(dot.classList.contains("IsOn")){
                col |= 1
            }
        }
        dots2 += `${col},`
    }

    return [dots1, dots2]
}

const getArduinoCode = (k) => {
    code12 = getArduinoCodeCalc(k);
    const dots1 = code12[0]
    const dots2 = code12[1]
    const charDots = "16," + dots1 + "16," + dots2.slice(0, -1)
    return charDots
}

const sendDotInformation = () => {
    let codes = []
    for(let i = 0; i < 4; i++)
        codes.push(getArduinoCode(i))
    const concatCodes = codes.join(",")
    sendFont.sendFont(concatCodes)
}

const multiString = () => {
    const txt = document.getElementById("char-input").value;
    fontDraw4(txt)
    sendDotInformation()
}

const createTable = () => {
    let table = document.createElement('table');
    for (let i = 1; i <= 16; i++) {
        let tr = document.createElement('tr');
        for (let j = 1; j <= 64; j++) {
            let td = document.createElement('td');
            let id = 'p' + i + "-" +  j;
            td.id = id;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.getElementById('led-font-table').appendChild(table);

    const dots = document.getElementById("led-font-table").getElementsByTagName("td")

    for(const dot of dots){
        dot.addEventListener("click", (e) => {
            const element = e.target
            if(element.classList.contains("IsOn")){
                element.classList.remove("IsOn")
            }else{
                element.classList.add("IsOn")
            }
            sendDotInformation()
        })
    }
}

const fontDraw4 = (txt) => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d", {alpha: true});
    ctx.clearRect(0, 0, 64, 16);

    const fontType = parseInt(document.getElementById("select-font").currentValue)

    // Set font properties
    ctx.font = "16px 'MS Gothic'";
    if(fontType == 2)
        ctx.font = "16px 'MS Mincho'";

    ctx.fillStyle = "black"; // Text color

    // Draw the text
    ctx.fillText(txt, 0, 14); // (x, y) coordinates

    for(let i = 0; i < 64; i++){
        for(let j = 0; j < 16; j++){
            const target = document.getElementById('p' + (j + 1) + "-" + (i + 1))

            const on = ctx.getImageData(i, j, 1, 1).data[3] == 255;
            // console.log(on);
            if(on){
                target.classList.add("IsOn")
            }else{
                target.classList.remove("IsOn")
            }
        }
    }
}

const fontDraw = (char, k) => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d", {alpha: true});

    ctx.clearRect(0, 0, 16, 16);
    
    // Set font properties
    ctx.font = "16px 'MS Gothic'";
    ctx.fillStyle = "black"; // Text color

    // Draw the text
    ctx.fillText(char, 0, 14); // (x, y) coordinates

    for(let i = 0; i < 16; i++){
        for(let j = 0; j < 16; j++){
            const target = document.getElementById('p' + (j + 1) + "-" + (i + (k * 16) + 1))

            const on = ctx.getImageData(i, j, 1, 1).data[3] == 255;
            // console.log(on);
            if(on){
                target.classList.add("IsOn")
            }else{
                target.classList.remove("IsOn")
            }
        }
    }
}

document.getElementById("exit").addEventListener("click", () => {
    api.exit()
})

// テーブルを作成
createTable()

// COM ポートを取得
api.getComports()

document.getElementById("char-input").addEventListener("change", (e) => {
    multiString()
})

document.getElementById("send-button").addEventListener("click", () => {
    multiString()
})
