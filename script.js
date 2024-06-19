const search_results_box=document.getElementsByClassName('search_results')[0];
const form=document.getElementById('search');
let data=null;
const fetchData=async()=>{
    const response= await fetch('https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-JS0101EN-SkillsNetwork/travel1.json');
    data=await response.json();
}
const searchTerms={
    beach:"beaches",
    country:"countries",
    temple:"temples"
}
function createCard(imageUri,title,description){
    const card=document.createElement('div');
    card.classList.add('card');

    const card_img=document.createElement('div');
    card_img.classList.add('card_img');

    const img=document.createElement('img');
    img.setAttribute('src',"./Images/"+imageUri);

    const card_content=document.createElement('div');
    card_content.classList.add('card_content');

    const card_title=document.createElement('h2');
    card_title.classList.add('card_title');
    card_title.innerText=title;

    const card_info=document.createElement('p');
    card_info.classList.add('card_info');
    card_info.innerText=description;

    const visit=document.createElement('button');
    visit.classList.add('visit');
    visit.innerText="Visit";

    card_img.append(img);
    card_content.append(...[card_title,card_info,visit]);
    card.append(...[card_img,card_content]);

    search_results_box.append(card);
}
fetchData().then((res)=>{
    console.log(data);
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const input=document.querySelector('input').value.toLowerCase();
        const places=data[searchTerms[input]] || data[input];
        if(!places){
            search_results_box.innerHTML="<h2 style='color: white; background-color: rgba(0,0,0,0.8); padding: 5px; align-self: center;'>Invalid Search term</h2>";
            return ;
        }
        search_results_box.innerHTML="";
        places.map((place)=>{
            if(place["cities"]){
                place["cities"].map((city)=>{
                    createCard(city.imageUrl.replace("enter_your_image_for_",""),city.name,city.description);
                })
            }
            else{
                createCard(place.imageUrl.replace("enter_your_image_for_",""),place.name,place.description);
            }
        })
    })
})
const resetButton=document.querySelector(".reset");
resetButton.addEventListener('click',(e)=>{
    e.preventDefault();
    const input=document.querySelector('input');
    input.value="";
    search_results_box.innerHTML="";

})