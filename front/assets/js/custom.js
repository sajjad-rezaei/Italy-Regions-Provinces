axios.defaults.baseURL = 'http://localhost:2000';
$('document').ready(function(){

    
    axios.get('/')
    .then(function (response) {
    
        let string = "";
        
        for (const item of response.data) {
            console.log(item.region_name)
            string += `<tr>        
            <td>${item.region_name}</td>
                <td>
                
                    <span class="show" data-toggle="modal" data-target="#detail" region="${item.region_name}"><i class="bi bi-eye-fill"></i></span>
                
                </td>
            </tr>`;
        }
        $("table tbody").append(string)
    })
    .catch(function (error) {
    
        console.log(error);
    });

    $(document).on('click','.show',function(){
        let selectedRegion = $(this).attr('region');
        axios.get('/'+selectedRegion)
        .then(function (response) {
            
            response = response.data
            $('#detail').removeClass('hidden').addClass('show');
            let string = `
                <li>population: <span>${response.population}</span></li>
                <li>territorial extension: <span>${response.t_extention}</span> Km<sup>2</sup></li>
                <li>capital: <span>${response.capital}</span></li>
                <li>president: <span>${response.president}</span></li>
                <li>provinces: 
                    <ul>
                    ${response.provinces.map(function (item ,i) {
                        return "<li>"  + item+ "</li>"           
                    }).join("")}
                    </ul>
                </li>
              `;
            $('.detail-list').html(string);
        })
        .catch(function (error) {
        
            console.log(error);
        });

    });
    
    $('.close').click(function(){
        $('#detail').removeClass('show').addClass('hidden');
    });
});