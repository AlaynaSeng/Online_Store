$('#sn').click(() => {
    location.assign('Shop.html');
})
$('.blk').click(() => {
    let current = JSON.parse(localStorage.getItem('Current'))
    if (localStorage.getItem('Current') == null) {
        alert('To continue, please create an account or log in')
        return;
    } else if (localStorage.getItem('Current') !== null) {
        location.assign('Shop.html')
    }
})

$('#admin').click(() => {
    let blist = document.getElementById('blist');
    blist.style.display = 'none';
    let ad = document.getElementById('ad');
    ad.style.display = 'block';
    let cre = document.getElementById('ca');
    cre.style.display = 'none';
    let reg = document.getElementById('ru');
    reg.style.display = 'none';
})

$('#registered').click(() => {
    let blist = document.getElementById('blist');
    blist.style.display = 'none';
    let ad = document.getElementById('ad');
    ad.style.display = 'none';
    let cre = document.getElementById('ca');
    cre.style.display = 'none';
    let reg = document.getElementById('ru');
    reg.style.display = 'block';
})

$('#create').click(() => {
    let blist = document.getElementById('blist');
    blist.style.display = 'none';
    let ad = document.getElementById('ad');
    ad.style.display = 'none';
    let cre = document.getElementById('ca');
    cre.style.display = 'block';
    let reg = document.getElementById('ru');
    reg.style.display = 'none';
})

$('#gb').click(() => {
    let blist = document.getElementById('blist');
    blist.style.display = 'block';
    let ad = document.getElementById('ad');
    ad.style.display = 'none';
    let cre = document.getElementById('ca');
    cre.style.display = 'none';
    let reg = document.getElementById('ru');
    reg.style.display = 'none';
})


let allUsers = [];

$('#csub').click(() => {
    let username = $('#cuser').val();
    let password = $('#cpass').val();
    let name = $('#name').val();

    if (username == '' || password == '' || name == '') {
        alert('To register you must fill out all information');
        return;
    } else {
        let info = {
            Username: username,
            Password: password,
            name: name,
            cart: []
        }
        allUsers.push(info);
        localStorage.setItem('Userinfo', JSON.stringify(allUsers));
        let blist = document.getElementById('blist');
        blist.style.display = 'block';
        let ad = document.getElementById('ad');
        ad.style.display = 'none';
        let cre = document.getElementById('ca');
        cre.style.display = 'none';
        let reg = document.getElementById('ru');
        reg.style.display = 'none';
    }
})

$('#rsub').click(() => {
    let useinfo = JSON.parse(localStorage.getItem('Userinfo'));
    let rp = $('#rpass').val();
    let ru = $('#ruser').val();

    if (rp == '' || ru == '') {
        alert("To continue as a registered user please fill out forms");
        return;
    } else {
        for (i in useinfo) {
            if (ru == useinfo[i].Username && rp == useinfo[i].Password) {
                alert('You are logged in!');
                localStorage.setItem('Current', JSON.stringify(useinfo[i]));
                location.reload();
            }
        }
    }
})



function loading() {
    let auser = 'Admin1';
    let apass = 'admin1';
    let admin = {
        Username: auser,
        Password: apass
    }

    localStorage.setItem("Admin", JSON.stringify(admin));


    var who;
    var current;

    if (localStorage.getItem('Current') !== null) {
        current = JSON.parse(localStorage.getItem('Current'));
        if (current.Username == 'Admin1' && current.Password == 'admin1') {
            who = 'You are the Admin';
        } else {
            who = `Welcome: ${current.name}`;
        }

        document.getElementById('who').innerHTML = who;

        if (current.Username !== 'Admin1' && current.Password !== 'admin1') {
            let len = current.cart
            if (len !== '') {
                document.getElementById('items').innerHTML = len.length
            }
        }
    }



    let nps = JSON.parse(localStorage.getItem('New'));
    let nrow = '';
    if (localStorage.getItem('New') !== null) {
        for (i in nps) {
            nrow += `<div id="new-product" class="col-4" value = "${i}" data-toggle="modal" data-target="#newmod">
                    <img src="${nps[i].picture}" alt="" role="button" class="shoppics">
                    <h5 class = "shopword">
                    ${nps[i].newName}
                    <br>
                    $${nps[i].newPrice}
                    </h5>
                 </div>`
        }
        $('#newprorow').html(nrow)
    }

    let sl = document.getElementById('shoplink')
    let stock = document.getElementById('stock')
    if (localStorage.getItem('Current') == null) {
        sl.style.display = 'none'
        stock.style.display = 'none'
        document.getElementById('sn').disabled = true
    } else if (current.Username !== 'Admin1' && current.Password !== 'admin1') {
        stock.style.display = 'none'
    }
}

$('#newprorow').on('click', '.col-4', function () {
    let index = $(this).attr("value");
    localStorage.setItem('index', JSON.stringify(index));
    let nps = JSON.parse(localStorage.getItem('New'))
    $('#title').html(nps[index].newName)
    $('#nid').html(nps[index].newID)
    $('#nprice').html(`$${nps[index].newPrice}`)
    $('#newdes').html(nps[index].newInfo)
    console.log(index)
})



$('#adsub').click(() => {
    let admin = JSON.parse(localStorage.getItem("Admin"));
    let adpass = $('#adpass').val();
    let aduse = $('#aduse').val();
    if (adpass == '' || aduse == '') {
        alert("Fill out inputs to login as admin");
        return;
    } else if (adpass == admin.Password && aduse == admin.Username) {
        alert('Welcome Admin');
        localStorage.setItem('Current', JSON.stringify(admin));
        location.reload();
    }
})

$('#logout').click(() => {
    localStorage.removeItem('Current');
    let blist = document.getElementById('blist');
    blist.style.display = 'block';
    let ad = document.getElementById('ad');
    ad.style.display = 'none';
    let cre = document.getElementById('ca');
    cre.style.display = 'none';
    let reg = document.getElementById('ru');
    reg.style.display = 'none';
    location.reload()
})



$('#lhyc').click(() => {
    let lq = $('#lquantity').val();
    let lc = $('#lhcolor').val();
    let cur = JSON.parse(localStorage.getItem('Current'))
    let lhInfo = {
        Bottle: 'Large Hydroflask',
        Price: 35.00 * lq,
        Quantity: lq,
        Color: lc
    }
    cur.cart.push(lhInfo)
    localStorage.setItem('Current', JSON.stringify(cur))

    var current;
    if (localStorage.getItem('Current') !== null) {
        current = JSON.parse(localStorage.getItem('Current'));
        let len = current.cart
        document.getElementById('items').innerHTML = len.length
    }

})

$('#flc').click(() => {
    let fq = $('#fquantity').val();
    let fc = $('#fcolor').val();
    let cur = JSON.parse(localStorage.getItem('Current'))
    let fInfo = {
        Bottle: 'Flavored Water',
        Price: 25.00 * fq,
        Quantity: fq,
        Color: fc
    }
    cur.cart.push(fInfo)
    localStorage.setItem('Current', JSON.stringify(cur))

    var current;

    if (localStorage.getItem('Current') !== null) {
        current = JSON.parse(localStorage.getItem('Current'));
        let len = current.cart
        document.getElementById('items').innerHTML = len.length
    }
})

$('#strawc').click(() => {
    let sq = $('#squantity').val();
    let sc = $('#scolor').val();
    let cur = JSON.parse(localStorage.getItem('Current'))
    let sInfo = {
        Bottle: 'Straw Bottle',
        Price: 20.00 * sq,
        Quantity: sq,
        Color: sc
    }
    cur.cart.push(sInfo)
    localStorage.setItem('Current', JSON.stringify(cur))

    var current;

    if (localStorage.getItem('Current') !== null) {
        current = JSON.parse(localStorage.getItem('Current'));
        let len = current.cart
        document.getElementById('items').innerHTML = len.length
    }
})

$('#glassc').click(() => {
    let gq = $('#gquantity').val();
    let gc = $('#gcolor').val();
    let cur = JSON.parse(localStorage.getItem('Current'))
    let gInfo = {
        Bottle: 'Glass Bottle',
        Price: 30.00 * gq,
        Quantity: gq,
        Color: gc
    }
    cur.cart.push(gInfo)
    localStorage.setItem('Current', JSON.stringify(cur))

    var current;

    if (localStorage.getItem('Current') !== null) {
        current = JSON.parse(localStorage.getItem('Current'));
        let len = current.cart
        document.getElementById('items').innerHTML = len.length
    }
})

$('#shc').click(() => {
    let smq = $('#smquantity').val();
    let smc = $('#smcolor').val();
    let cur = JSON.parse(localStorage.getItem('Current'))
    let smInfo = {
        Bottle: 'Small Hydroflask',
        Price: 25.00 * smq,
        Quantity: smq,
        Color: smc
    }
    cur.cart.push(smInfo)
    localStorage.setItem('Current', JSON.stringify(cur))

    var current;

    if (localStorage.getItem('Current') !== null) {
        current = JSON.parse(localStorage.getItem('Current'));
        let len = current.cart
        document.getElementById('items').innerHTML = len.length
    }
})

$('#sqc').click(() => {
    let sqq = $('#sqquantity').val();
    let sqc = $('#sqcolor').val();
    let cur = JSON.parse(localStorage.getItem('Current'))
    let sqInfo = {
        Bottle: 'Squeeze Bottle',
        Price: 15.00 * sqq,
        Quantity: sqq,
        Color: sqc
    }
    cur.cart.push(sqInfo)
    localStorage.setItem('Current', JSON.stringify(cur))

    var current;

    if (localStorage.getItem('Current') !== null) {
        current = JSON.parse(localStorage.getItem('Current'));
        let len = current.cart
        document.getElementById('items').innerHTML = len.length
    }
})


$('#car').click(() => {
    location.assign('Cart.html')
})


function cartload() {
    let cu = JSON.parse(localStorage.getItem('Current'))
    let pr = cu.cart
    let prol = '';

    $('#cart').modal('show')
    let p = 0
    for (i in pr) {
        p = pr[i].Price + p
        prol += `
                    <tr>
                        <td>${pr[i].Quantity}</td>
                        <td>${pr[i].Bottle}</td>
                        <td>${pr[i].Color}</td>
                        <td>$${pr[i].Price}</td>
                        <td>
                        <button id="del">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                        </button>
                        </td>
                    </tr>    
                `
    }
    $('#prolist').html(prol)
    document.getElementById('fp').innerHTML = `<h5><b>Total Price: $${p}</b></h5>`

    var who;
    if (cu.Username == 'Admin1' && cu.Password == 'admin1') {
        who = 'You are the Admin';
    } else {
        who = `Welcome: ${cu.name}`;
    }

    document.getElementById('who').innerHTML = who;
}

let newProduct = [];
$('#snp').click(() => {
    let npn = $('#newname').val();
    let nid = $('#newid').val();
    let npi = $('#newproinfo').val();
    let npr = $('#newprice').val();

    if (npn == '' || nid == '' || npi == '' || npr == '') {
        alert('To make a new product, be sure to fill out all parts of the form');
        return;
    } else {
        let nproduct = {
            newName: npn,
            newID: nid,
            newPrice: npr,
            newInfo: npi
        }

        let pFile = $('#newpro')[0].files[0];
        let read = new FileReader();
        read.readAsDataURL(pFile);
        read.onload = function () {
            let img = read.result;
            nproduct.picture = img;
            newProduct.push(nproduct);
            localStorage.setItem('New', JSON.stringify(newProduct));
        }
    }
})

function pic() {
    $('#newpro').change(function (e) { //Event that is triggered when the file changes
        var file = e.target.files[0]; //Variable that targets the file selected by the element selector (fileInput) 
        var imageType = /image.*/; //A variable to filter file type

        if (file.type.match(imageType)) { //It creates the instance of FileReader API only if the file type matches
            var reader = new FileReader(); //Creates the reader
            reader.readAsDataURL(file); //Reads the content of the file
            reader.onload = function (e) { //When the file finished loading, we can access the result
                $('#propic').html(''); //Clears the DIV where the image will be displayed
                var img = new Image(); //Creates a new image
                img.src = reader.result; //Set the img src property using the data URL
                $(img).addClass('img-fluid')
                $('#propic').append(img); //Add the image to the DIV
            };
        } else {
            $('#propic').html('File not supported!'); //If the file selected is not supported, a message is displayed
        }
    });
};

$('#prolist').on('click', 'button[id = "del"]', function () {
    let current = JSON.parse(localStorage.getItem('Current'));
    let items = current.cart;
    let i = $(this).attr('value');
    $(this).closest('tr').remove();
    items.splice(i, 1);
    current.cart = items;
    localStorage.setItem('Current', JSON.stringify(current));
    cartload();
})

$('#cart').click(() => {
    let nProduct = JSON.parse(localStorage.getItem('New'));
    let index = JSON.parse(localStorage.getItem('index'));
    let cur = JSON.parse(localStorage.getItem('Current'));
    let color = $('#color').val()
    let pname = $('#title').html()
    let price = nProduct[index].newPrice;
    let quantity = $('#quantity').val();

    let ninfo = {
        Bottle: pname,
        Price: price * quantity,
        Quantity: quantity,
        Color: color
    }

    cur.cart.push(ninfo)
    localStorage.setItem('Current', JSON.stringify(cur))
    var current;

    if (localStorage.getItem('Current') !== null) {
        current = JSON.parse(localStorage.getItem('Current'));
        let len = current.cart
        document.getElementById('items').innerHTML = len.length
    }
})


