//iterated cards

//====HERO STATS
const hero_stats = document.getElementsByClassName('stat');
const statsData = [
    { label: 'word arts', value: '30.000+' },
    { label: 'digital artist', value: '17.000+' },
    { label: 'live auctions', value: '22.000+' },
    { label: 'unique products', value: '50.000+' }
];

statsData.forEach(stat => {
    const statDiv = document.createElement('div');
    statDiv.classList.add('hero-stat');
    
    const p = document.createElement('p');
    p.classList.add('title');
    p.textContent = stat.label;
    statDiv.appendChild(p);

    const h5 = document.createElement('h5')
    h5.classList.add('value');
    h5.textContent = stat.value;
    statDiv.appendChild(h5);

    hero_stats[0].appendChild(statDiv);
});



//=== instruction wrapper
const instruction_wrapper = document.getElementById('instruction-cards');

//=== transaction instruction
const instruct_data = [
    {
      title: "Set Up Your Wallet",
      description: "Connect your wallet to Nico by clicking the wallet icon in the top right corner after you've set it up.",
      icon: "./assets/Coin-Wallet.png",
    },
    {
      title: "Create Unique Collection",
      description: "Set a secondary sales fee and add social links, a description, profile and banner images, and a description.",
      icon: "./assets/Add-New.png",
    },
    {
      title: "Download NFTs",
      description: "Add a title and description to your work (picture, video, audio, or 3D art), then customize your NFTs with properties.",
      icon: "./assets/NFT.png",
    },
    {
      title: "Put Them Up for Sale",
      description: "Auctions, fixed-price listings, and declining-price listings are all options. You decide how you'd like to sell your NFTs.",
      icon: "./assets/Sell.png",
    },
]
        
//==instruction-card
instruct_data.forEach(data=>{

    const instruction_card = document.createElement('div');
    instruction_card.classList.add('instruction-card');
    
    const h6 = document.createElement('h6');
    h6.textContent = data.title;
    
    const p = document.createElement('p');
    p.textContent = data.description;

    const div = document.createElement('div');
    div.className = 'icon';


    const img = document.createElement('img');
    img.src = data.icon;

    div.appendChild(img);
    instruction_card.appendChild(h6);
    instruction_card.appendChild(p);
    instruction_card.appendChild(div);
    instruction_wrapper.appendChild(instruction_card);
})



//==== NFT-CARD
const nft_wrapper =  document.getElementById('nft-cards-wrapper');
for(let nft = 1; nft < 7; nft++){

    const nft_card = document.createElement('div')
    nft_card.classList.add('nft-card'); //card container
    
    //nft image
    const nft_img = document.createElement('div')
    const img = document.createElement('img')
    nft_img.classList.add('card-img'); // card img
    img.src = `./assets/nft-${nft}.png`;

    nft_img.appendChild(img);

            
    //nft name and price wrapper
    const nft_info = document.createElement('div')
    nft_info.classList.add('card-info'); //card title
            
    //name of nft
    const nft_title = document.createElement('p')
    nft_title.classList.add('card-title'); //card title
    nft_title.textContent = `cyber samurai #54${nft}`
    //===nft price
    const nft_price = document.createElement('div');
    const price = document.createElement('p');
    price.textContent = `${(4 / nft).toFixed(2)}`;

    //ethereum logo
    const eth_logo = document.createElement('img');
    eth_logo.src = './assets/Ethereum.png';

    nft_price.appendChild(price);
    nft_price.appendChild(eth_logo);
    nft_price.classList.add('nft-price');
    nft_info.appendChild(nft_price);


    
    const nft_btn = document.createElement('button')
    nft_btn.classList.add('full-btn'); //card title;
    nft_btn.setAttribute('type', 'button');
    nft_btn.textContent = 'buy product';
    
    nft_info.appendChild(nft_title);
    nft_card.appendChild(nft_img);
    nft_card.appendChild(nft_info);
    nft_card.appendChild(nft_btn);

    nft_wrapper.appendChild(nft_card);
}


//partnership 
const part_wrap = document.getElementById('partner-wrap');
        
for(i=1; i<7; i++){
    const pat_img = document.createElement('img');
    pat_img.src = `./assets/pat-${i}.png`;
    pat_img.classList.add(`pat-${i}`);
    
    part_wrap.appendChild(pat_img);
}


///===== NFT articles
const nftArticles = [
    {
      date: "April 18, 2022",
      title: "Few Reasons to Sell NFTs on Nico",
      image: "./assets/article-1.png", // Replace with actual image URL or path
    },
    {
      date: "April 18, 2022",
      title: "Few Reasons to Sell NFTs on Nico",
      image: "./assets/article-2.png", // Replace with actual image URL or path
    },
];

//article parent
const news_wrap = document.getElementById('article-wrapper') 
//article card
nftArticles.forEach(art => {

    const div = document.createElement('div');
    div.classList.add('news-card')
    
    const news_img = document.createElement('img');
    news_img.classList.add('news-img');
    news_img.src = art.image;

    const p = document.createElement('p');
    p.classList.add('news-date');
    p.textContent = art.date;

    const h5 = document.createElement('h5');
    h5.classList.add('news-title');
    h5.textContent = art.title;

    div.appendChild(news_img);
    div.appendChild(p);
    div.appendChild(h5);

    news_wrap.appendChild(div);
})


/// small screens menu switch
const menuSwitch = document.getElementById('menu-btn');
const menuTray = document.getElementById('menu-tray')



menuSwitch.onclick = () => {
    menuTray.classList.toggle('visible');
    menuSwitch.classList.toggle('clicked');
}