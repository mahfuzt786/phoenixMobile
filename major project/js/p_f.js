$(document).ready(function(){
    $("div.row1").on("click","a#bt",function(){
        var v1,v2,v3,v4,v5,v6,v7;
        v1=$("div.row1 input#p").val();
        v2=$("div.row1 input#st").val();
        v3=$("div.row1 input#nm").val();
        v4=$("div.row1 textarea#ad").val();
        v5=$("div.row1 input#ph").val();
        v6=$("div.row1 input#em").val();
        v7=$("div.row1 input#pass").val();
       
        if(v1===""){
            $('div#popupError div#successBody p.errorMessage').text('Please Enter Parents ID');
			$('div#popupError').popup("open");
        }
        else if(v2===""){
            $('div#popupError div#successBody p.errorMessage').text('Please Enter Student ID');
			$('div#popupError').popup("open");
        }
        else if(v3===""){
            $('div#popupError div#successBody p.errorMessage').text('Please Enter Name');
			$('div#popupError').popup("open");
        }
        else if(v4===""){
            $('div#popupError div#successBody p.errorMessage').text('Please Enter Address');
			$('div#popupError').popup("open");
        }
        else if(v5===""){
            $('div#popupError div#successBody p.errorMessage').text('Please Enter Phone number');
			$('div#popupError').popup("open");
        }
        else if(v6===""){
            $('div#popupError div#successBody p.errorMessage').text('Please Enter Email');
			$('div#popupError').popup("open");
        }
        else if(v7===""){
            $('div#popupError div#successBody p.errorMessage').text('Please Enter Password');
			$('div#popupError').popup("open");
        }
      
		else if(!IsEmail(v6))
		{
			$('div#popupError div#successBody p.errorMessage').text('Please enter email in xxxxx@xxx.xxx format. ie john.doe@gmail.com');
			$('div#popupError').popup("open");
		}
        else{
            $.ajax({
				url: "services/faculty-info.php",
				type: "POST",
				data: {
					action      : 'postItem',
					p_id      :  v1,
					st_id      : v2,
					name      : v3,
					address      :  v4,
					ph_no      :  v5,
					email      :  v6,
					password      :  v7,
					
				},
				dataType: "json",
				success: function(result) {
					if(result.status =='1')
					{
						$('div#popupError div#successBody p.errorMessage').text(result.message);
						$('div#popupError').popup("open");
					}
					if(result.status =='0' && result.message == 'done')
					{
						location.reload();
						Lobibox.alert("success",
						{
							msg: 'Successfully Added ',
							callback: function ($this, type)
							{
								if(type=='ok')
								{
									location.reload();
								}
							}
						});
					}
					else {
						$('div#popupError div#successBody p.errorMessage').text(result.message);
						$('div#popupError').popup("open");
					}
				},
				error: function () {
					$('div#popupError div#successBody p.errorMessage').text('Error in Adding');
						$('div#popupError').popup("open");
				}
			});
        }
        
        });
		
		/*phone number check*/
		$('#ph').keyup(function () {
			if (!this.value.match(/^([0-9]{0,15})$/)) {
				this.value = this.value.replace(/[^0-9]/g, '').substring(0,15);
			}
		});
	   
	   /*email validation*/
		function IsEmail(em) {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return regex.test(em);
		}
    });