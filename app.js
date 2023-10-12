async function getOrders(){
    const url ="http://localhost/kkwordpress/wp-json/wc/v3/orders"
    const data = await fetch(url,{
    method: "GET",
    headers:{
        Authorization:`Basic ${btoa("Kajetan:kajtulasty12")}`
    }
})
    const json = await data.json()
    console.log(json)
    document.querySelector("body").innerHTML=" "

for(let i in json){
    const list = document.querySelector("body")
    const div = document.createElement("div")
    div.classList.add("orders")

    const divlist = document.createElement("div")
    divlist.classList.add("divlist")
    const ul = document.createElement("ul")
    for(let j in json[i].line_items){
        const li = document.createElement("li")
        li.innerHTML= json[i].line_items[j].name
        ul.appendChild(li)
    }

    const divcustomer = document.createElement("div")
    divcustomer.classList.add("divcustomer")
    const h1 = document.createElement("h1")
    const h2 = document.createElement("h2")
    const h3 = document.createElement("h3")
    h1.innerHTML= json[i].billing.first_name
    h2.innerHTML= json[i].billing.last_name
    h3.innerHTML= json[i].billing.email

    const divbuttons = document.createElement("div")
    divbuttons.classList.add("divbuttons")
    const button = document.createElement("button")
    button.innerHTML= "ZREALIZOWANO"
    button.classList.add("buttons")
    button.addEventListener("click",()=>{
        realize(json[i].id)
    })
    div.appendChild(divbuttons)
    divbuttons.appendChild(button)
    divcustomer.appendChild(h1)
    divcustomer.appendChild(h2)
    divcustomer.appendChild(h3)
    div.appendChild(divcustomer)
    divlist.appendChild(ul)
    div.appendChild(divlist)
    list.appendChild(div)
    if(json[i].status == "completed"){
    div.style.visibility = "hidden"
    div.style.width = "0px"
    div.style.height="0px"
    div.style.border = "0px"
    }else{
        div.style.visibility = "visible"
    }
}

}
getOrders()
async function realize(id){
    console.log(id)
    const url = new URL(`http://localhost/kkwordpress/wp-json/wc/v3/orders/${id}`)
    var params={
        "status":"completed"
    }
    for(let i in params){
        url.searchParams.append(i, params[i])
    }
    const data = await fetch(url,{
        method: "POST",
    headers:{
        Authorization:`Basic ${btoa("Kajetan:kajtulasty12")}`
    }
    })
    getOrders()
}