
		var jsonData={}
		var user_group
		$(document).ready(function(){
			checkUserGroup()
			$('#blur_control').prop('checked', false);
			$('#blur_range').hide();
			$('#blur_customRange').val(0);
			$('#grayscale_control').prop('checked', false);
			$('#grayscale_range').hide();
			$('#grayscale_customRange').val("0");
			$('#brightness_control').prop('checked', false);
			$('#brightness_range').hide();
			$('#brightness_customRange').val("100");
			$('#contrast_control').prop('checked', false);
			$('#contrast_range').hide();
			$('#contrast_customRange').val("100");
			$('#invert_control').prop('checked', false);
			$('#invert_range').hide();
			$('#invert_customRange').val("0");
			$('#saturate_control').prop('checked', false);
			$('#saturate_range').hide();
			$('#saturate_customRange').val("100");
			$('#sepia_control').prop('checked', false);
			$('#sepia_range').hide();
			$('#sepia_customRange').val("0");
			$('#opacity_control').prop('checked', false);
			$('#opacity_range').hide();
			$('#opacity_customRange').val("100");
			$('#huerotate_control').prop('checked', false);
			$('#huerotate_range').hide();
			$('#huerotate_customRange').val("0");
			$('#scalar_customRange').val(100);
			$('#width_size').val('');
			$('#height_size').val('');
			$('#scale_width_size').val('');
			$('#scale_height_size').val('');
			$('#social_width_size').val('');
			$('#social_height_size').val('');
			$('#scalar_customRange').val(100);
			$("#remoteURL_modal").click(function(e){
				e.stopPropagation();
			    $("#myModal").modal("toggle");
			});
			$("#change_file_name").click(function(e){
				if(user_group!="FREE"){
				Swal.fire({
					title: "Change file name",
					html: "<input class='form-control' id='new_file_name'></input>",
					showCloseButton: true,
					showCancelButton: false,
					showConfirmButton: true,
					focusConfirm: true,
					focusClose:false,
					customClass: {
					  content: 'swalContent',
					  confirmButton: 'swalStart',
					  title: 'swalTitle'
					},
					confirmButtonText:
					  'OK'
				  });
				  $(".swalStart").click(function(e){
					  var new_file_name = $("#new_file_name").val()
					  var extension = $("#file_name_text").html().split(".")[1]
					  $("#file_name_text").html(new_file_name+"."+extension)
				  })
				}else{
					Swal.fire("This is a PRO Feature","In order to use this feature, please upgrade to PRO.","error")
				}
			})
		});
		let file_name = document.getElementById("file_name_text");
		const previewContainer = document.getElementById("imagePreview");
		let previewImage = document.getElementById("image_preview_image");
		const previewDefaultText = previewContainer.querySelector(".image_preview__default_text");
		//Resizer Variables
		let sizeUnit = document.getElementById("unit_select").value,
			format = document.getElementById("format_select").value;
		//Compress Variables
		let compressLevel = document.getElementById("compress_level_select").value,
			compress_format = document.getElementById("compress_format_select").value,
			compressnum = document.getElementById("customRange3").value;

		let scale_rate;

		let dropArea = document.getElementById('upload_box');
		const inpFile = document.getElementById("inpFile");

		
		function selectFormat() {
			format = document.getElementById("format_select").value;
		}
		function selectSocial() {
			var social_select = document.getElementById("social_select").value;
			let social_width, social_height;
			switch(social_select) {
			  case "youtube_channel_icon":
			    social_width = 800;
			    social_height = 800;
			    break;
			  case "youtube_thumbnail":
			    social_width = 1280;
			    social_height = 720;
			    break;
			  case "youtube_channel_cover":
			    social_width = 2560;
			    social_height = 1440;
			    break;
			  case "facebook_profile_picture":
			    social_width = 180;
			    social_height = 180;
			    break;
			  case "facebook_cover_image":
			    social_width = 820;
			    social_height = 312;
			    break;
			  case "facebook_post_image":
			    social_width = 1200;
			    social_height = 630;
			    break;
			  case "facebook_event_image":
			    social_width = 1920;
			    social_height = 1080;
			    break;
			  case "twitter_profile_picture":
			    social_width = 400;
			    social_height = 400;
			    break;
			  case "twitter_header_size":
			    social_width = 1500;
			    social_height = 500;
			    break;
			  case "twitter_post_size":
			    social_width = 440;
			    social_height = 220;
			    break;
			  case "instragram_profile_picture":
			    social_width = 10;
			    social_height = 10;
			    break;
			  case "instragram_post_size":
			    social_width = 1080;
			    social_height = 1080;
			    break;
			  case "instragram_story_image":
			    social_width = 1080;
			    social_height = 1920;
			    break;
			  case "pinterest_profile_picture":
			    social_width = 110;
			    social_height = 110;
			    break;
			  case "pinterest_board_cover":
			    social_width = 222;
			    social_height = 150;
			    break;
			  case "linkedin_profile_image":
			    social_width = 165;
			    social_height = 165;
			    break;
			  case "linkedin_banner_size":
			    social_width = 1584;
			    social_height = 396;
			    break;
			  case "linkedin_company_logo":
			    social_width = 300;
			    social_height = 300;
			    break;
			  case "linkedin_company_cover":
			    social_width = 1536;
			    social_height = 768;
			    break;
			  case "turnblr_image_post":
			    social_width = 500;
			    social_height = 750;
			    break;
			  case "snapchat_image":
			    social_width = 1080;
			    social_height = 1920;
			    break;
			  case "whatsapp_profile_picture":
			    social_width = 192;
			    social_height = 192;
			    break;
			  case "tiktok_profile_picture":
			    social_width = 200;
			    social_height = 200;
			    break;
			  case "twitch_banner_size":
			    social_width = 900;
			    social_height = 480;
			    break;
			  case "etsy_shop_icon":
			    social_width = 500;
			    social_height = 500;
			    break;
			  case "etsy_cover_photo":
			    social_width = 1200;
			    social_height = 300;
			    break;
			  case "soundcloud_profile_picture":
			    social_width = 400;
			    social_height = 400;
			    break;
			  case "soundcloud_banner_size":
			    social_width = 2480;
			    social_height = 520;
			    break;
			  case "social_media_post":
			    social_width = 800;
			    social_height = 800;
			    break;
			  case "presentation":
			    social_width = 1024;
			    social_height = 768;
			    break;
			  case "blog_graphic":
			    social_width = 800;
			    social_height = 1200;
			    break;
			  default:
			    break;
			} 
			document.getElementById("social_width_size").value = social_width;
			document.getElementById("social_height_size").value = social_height;
			changeSocialWidth();
			changeSocialHeight();
		}
		function selectUnit() {
			sizeUnit = document.getElementById("unit_select").value;
			document.getElementById("width_unit").innerHTML = sizeUnit;
			document.getElementById("height_unit").innerHTML = sizeUnit;
			changeWidth();
			changeHeight();
		}
		function selectCompressFormat() {
			compress_format = document.getElementById("compress_format_select").value;
		}
		function selectLevel() {
			compressLevel = document.getElementById("compress_level_select").value;
			document.getElementById("customRange3").value = compressLevel*100;
		}
		function rangechange() {
			compressnum = document.getElementById("customRange3").value;
		}
		function debugBase64(base64URL, width, height){
		    var win = window.open();
			win.document.write('<img src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:' + width  + '; height:' + height  + ';" allowfullscreen></img>');
			win.document.close()
		}
		function FullSizeImg() {
			var oImage = document.getElementById("image_preview_image");
		    var canvas = document.createElement("canvas");
		    var link = document.createElement('a');
  			
  			document.body.appendChild(canvas);
		    link.appendChild(canvas);
		    if (typeof canvas.getContext == "undefined" || !canvas.getContext) {
		        alert("browser does not support this action, sorry");
		        return false;
		    }
		    try {
		        var context = canvas.getContext("2d");
		        var width = oImage.width;
		        var height = oImage.height;
		        canvas.width = width;
		        canvas.height = height;
		        canvas.style.width = width + sizeUnit;
		        canvas.style.height = height + sizeUnit;
		        context.drawImage(oImage, 0, 0, width, height);
		        let target_format = "image/png";
		        var rawImageData = canvas.toDataURL(target_format);
		        if (rawImageData.length > 10) {
					var preview_width = document.getElementById("image_preview_image").width;
					var preview_height = document.getElementById("image_preview_image").height;
		        	debugBase64(rawImageData, preview_width, preview_height);
					link.removeChild(canvas)
			        document.body.removeChild(canvas);
		        } else {
		        	alert("Selece Image...")
		        }
		    }
		    catch (err) {
		    	link.removeChild(canvas);
		        document.body.removeChild(link);
		    }

		    return true;
		}
		function downloadImg() {
			var download_name = file_name.innerHTML.split(".")[0]
			console.log("download_name", download_name);
			var oImage = document.getElementById("image_preview_image");
		    var canvas = document.createElement("canvas");
		    var link = document.createElement('a');
  			
  			document.body.appendChild(link);
		    link.appendChild(canvas);
		    if (typeof canvas.getContext == "undefined" || !canvas.getContext) {
		        alert("browser does not support this action, sorry");
		        return false;
		    }
		    try {
		        var context = canvas.getContext("2d");
		        var width = oImage.width;
		        var height = oImage.height;
		        canvas.width = width;
		        canvas.height = height;
		        canvas.style.width = width + sizeUnit;
		        canvas.style.height = height + sizeUnit;
		        context.drawImage(oImage, 0, 0, width, height);
		        let target_format;
		        if (format) {
		        	target_format = "image/" + format;
		        } else {
		        	target_format = "image/png";
		        }
		        
		        var rawImageData = canvas.toDataURL(target_format);

		        rawImageData = rawImageData.replace("image/png", target_format);
		        if (rawImageData.length > 10) {
		        	link.href = rawImageData;
					link.download = download_name+'.'+format;
					link.click();
					link.removeChild(canvas)
			        document.body.removeChild(link);
		        } else {
		        	alert("Selece Image...")
		        }
		    }
		    catch (err) {
		        document.body.removeChild(canvas);
		    }

		    return true;
		}
		function downloadSocialImg() {
			var download_name = file_name.innerHTML.split(".")[0]
			var oImage = document.getElementById("image_preview_image");
		    var canvas = document.createElement("canvas");
		    var link = document.createElement('a');
  			
  			document.body.appendChild(link);
		    link.appendChild(canvas);
		    if (typeof canvas.getContext == "undefined" || !canvas.getContext) {
		        alert("browser does not support this action, sorry");
		        return false;
		    }
		    try {
		        var context = canvas.getContext("2d");
		        var width = oImage.width;
		        var height = oImage.height;
		        canvas.width = width;
		        canvas.height = height;
		        canvas.style.width = width + 'px';
		        canvas.style.height = height + 'px';
		        context.drawImage(oImage, 0, 0, width, height);
		        let target_format;
		        if (format) {
		        	target_format = "image/" + format;
		        } else {
		        	target_format = "image/jpeg";
		        }
		        var rawImageData = canvas.toDataURL(target_format);

		        rawImageData = rawImageData.replace("image/png", target_format)
		        if (rawImageData.length > 10) {
		        	link.href = rawImageData;
		        	if (format) {
		        		link.download = download_name+'.'+format;
		        	} else {
		        		link.download = download_name+'.jpg'
		        	}
					link.click();
					link.removeChild(canvas)
			        document.body.removeChild(link);
		        } else {
		        	alert("Selece Image...")
		        }
		    }
		    catch (err) {
		        document.body.removeChild(canvas);
		    }

		    return true;
		}
		function downloadScaleImg() {
			var download_name = file_name.innerHTML.split(".")[0]
			var oImage = document.getElementById("image_preview_image");
		    var canvas = document.createElement("canvas");
		    var link = document.createElement('a');
  			
  			document.body.appendChild(link);
		    link.appendChild(canvas);
		    if (typeof canvas.getContext == "undefined" || !canvas.getContext) {
		        alert("browser does not support this action, sorry");
		        return false;
		    }
		    try {
		        var context = canvas.getContext("2d");
		        var width = oImage.width;
		        var height = oImage.height;
		        canvas.width = width;
		        canvas.height = height;
		        canvas.style.width = width + sizeUnit;
		        canvas.style.height = height + sizeUnit;
		        context.drawImage(oImage, 0, 0, width, height);
		        let target_format;
		        if (format) {
		        	target_format = "image/" + format;
		        } else {
		        	target_format = "image/jpeg";
		        }
		        var rawImageData = canvas.toDataURL(target_format);

		        rawImageData = rawImageData.replace("image/png", target_format);
		        if (rawImageData.length > 10) {
		        	link.href = rawImageData;
					link.download = download_name+'.'+format;
					link.click();
					link.removeChild(canvas)
			        document.body.removeChild(link);
		        } else {
		        	alert("Selece Image...")
		        }
		    }
		    catch (err) {
		        document.body.removeChild(canvas);
		    }

		    return true;
		}
		function downloadCompressImg() {
			var download_name = file_name.innerHTML.split(".")[0]
			const compress = Number(compressLevel);
			const compress_num = compressnum/100;
			var oImage = document.getElementById("image_preview_image");
		    var canvas = document.createElement("canvas");
		    var link = document.createElement('a');
  			
  			document.body.appendChild(link);
		    link.appendChild(canvas);
		    if (typeof canvas.getContext == "undefined" || !canvas.getContext) {
		        alert("browser does not support this action, sorry");
		        return false;
		    }
		    try {
		        var context = canvas.getContext("2d");
		        var width = oImage.width;
		        var height = oImage.height;
		        canvas.width = width;
		        canvas.height = height;
		        context.drawImage(oImage, 0, 0, width, height);
		        let target_format;
		        if (format) {
		        	target_format = "image/" + compress_format;
		        } else {
		        	target_format = "image/jpeg";
		        }
		        var rawImageData = canvas.toDataURL("image/jpeg", compress_num);
		        rawImageData = rawImageData.replace("image/jpeg", target_format);
		        if (rawImageData.length > 10) {
		        	link.href = rawImageData;
					link.download = download_name+'.'+compress_format;
					link.click();
					link.removeChild(canvas)
			        document.body.removeChild(link);
		        } else {
		        	alert("Selece Image...")
		        }
		        
		    }
		    catch (err) {
		        document.body.removeChild(canvas);
		    }

		    return true;
		}
		function changeSocialWidth() {
			if(user_group!="FREE"){
				let x = document.getElementById("social_width_size").value;
				let y = document.getElementById("social_height_size").value;
				document.getElementById("image_preview_image").style.width = x+'px';
				document.getElementById("full_size_text").innerHTML = x + " X " + y;
			}else{
				Swal.fire("This is a PRO Feature","In order to use this feature, please upgrade to PRO.","error")
				$("#social_width_size").val("")
			}
	  	}
	  	function changeSocialHeight() {
			if(user_group!="FREE"){
				let x = document.getElementById("social_width_size").value;
				var y = document.getElementById("social_height_size").value;
				document.getElementById("image_preview_image").style.height = y+'px';
				document.getElementById("full_size_text").innerHTML = x + " X " + y;
			}else{
				Swal.fire("This is a PRO Feature","In order to use this feature, please upgrade to PRO.","error")
				$("#social_height_size").val("")
			}
	  	}
		function changeWidth() {
		    let x = document.getElementById("width_size").value;
		    let y = document.getElementById("height_size").value;
		    document.getElementById("image_preview_image").style.width = x+sizeUnit;
		    document.getElementById("image_preview_image").style.height = y+sizeUnit;
		    document.getElementById("full_size_text").innerHTML = x + " X " + y;
	  	}
	  	function changeHeight() {
	  		let x = document.getElementById("width_size").value;
		    var y = document.getElementById("height_size").value;
		    document.getElementById("image_preview_image").style.height = y+sizeUnit;
		    document.getElementById("image_preview_image").style.width = x+sizeUnit;
		    document.getElementById("full_size_text").innerHTML = x + " X " + y;
	  	}
	  	function scaleChangeWidth() {
		    var w = document.getElementById("scale_width_size").value;
		    var y = w/rate;
		    document.getElementById("image_preview_image").style.width = w+sizeUnit;
		    document.getElementById("image_preview_image").style.height = y+sizeUnit;
		    document.getElementById("scale_height_size").value = previewImage.height;
		    document.getElementById("full_size_text").innerHTML = x + " X " + y;
	  	}
	  	function scaleChangeHeight() {
		    var y = document.getElementById("scale_height_size").value;
		    var w = y*rate;
		    document.getElementById("image_preview_image").style.width = w+sizeUnit;
		    document.getElementById("image_preview_image").style.height = y+sizeUnit;
		    document.getElementById("scale_width_size").value = previewImage.width;
		    document.getElementById("full_size_text").innerHTML = x + " X " + y;
	  	}
	  	function scalarRangechange() {
	  		var scalar = document.getElementById("scalar_customRange").value/100;
			var w = Math.floor(initialW * scalar);
			var y = Math.floor(initialY * scalar);
			document.getElementById("image_preview_image").style.width = w+'px';
		    document.getElementById("image_preview_image").style.height = y+'px';
		    document.getElementById("scalarRangeVal").innerHTML = scalar * 100 + "%";
		    document.getElementById("full_size_text").innerHTML = w + " X " + y;
		    $('#scale_width_size').val(w);
			$('#scale_height_size').val(y);
		}
	  	document.getElementById("fileUploadButton").addEventListener("click", function(e){
	  		e.stopPropagation();
	  		console.log("test", previewImage.style.width, previewImage.style.height);
		  	document.getElementById("inpFile").click();  // trigger the click of actual file upload button
		});
		function importURL() {
			var y = document.getElementById("remoteURL").value;
			fetch(y, {
				mode: 'cors'
			})
			.then(resp => {
				return resp.blob();
			})
			.then(blob => {
				previewAnduploadImage(blob);
			})
			.catch(error => console.log(error.json()));
		}		
		dropArea.addEventListener('click', function() {
			inpFile.click();
		});
		
		function preventDefault(e) {
		    e.preventDefault();
		    e.stopPropagation();
		}
 		function addClass() {
 			dropArea.classList.add("highlight");
 			document.getElementById("upload_button").classList.add("highlight");
 		}
 		function removeClass() {
 			dropArea.classList.remove("highlight");
 			document.getElementById("upload_button").classList.remove("highlight");
 		}
 		
		dropArea.addEventListener('dragenter', preventDefault, false);
		dropArea.addEventListener('dragleave', preventDefault, false);
		dropArea.addEventListener('dragover', preventDefault, false);
		dropArea.addEventListener('drop', preventDefault, false);
		dropArea.addEventListener('dragenter', addClass, false);
		dropArea.addEventListener('dragleave', removeClass, false);
		dropArea.addEventListener('dragover', addClass, false);
		dropArea.addEventListener('drop', removeClass, false);

		let initialW, initialY;
		
		inpFile.addEventListener("change", function() {
			const file = this.files[0];
			if (file) {
				previewImage.style.width = "";
	  			previewImage.style.height = "";
				file_name.innerHTML = file.name;
				const reader = new FileReader();
				previewDefaultText.style.display = "none";
				previewImage.style.display = "block";
				reader.addEventListener("load", function() {
					previewImage.addEventListener("load", function() {
						initialW = this.width;
						initialY = this.height;
						rate = initialW/initialY;
						document.getElementById("width_size").value = this.width;
						document.getElementById("scale_width_size").value = this.width;
						document.getElementById("height_size").value = this.height;
						document.getElementById("scale_height_size").value = this.height;
						document.getElementById("full_size_text").innerHTML = this.width + " X " + this.height;
						$("#change_file_name").css("display","inline-block")
					});
					previewImage.setAttribute("src", this.result);
				});
				reader.readAsDataURL(file);				
			} else {
				previewDefaultText.style.display = null;
				previewImage.style.display = null;
				previewImage.setAttribute("src", "")
			}
		})
		function handleDrop(e) {
		    var dt = e.dataTransfer,
		        files = dt.files;

		    if (files.length) {
		        handleFiles(files);
		    }
		    else {
        // check for img
	        var html = dt.getData('text/html'),
	            match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html),
	            url = match && match[1];
		        if (url) {
		            uploadImageFromURL(url);
		            return;
		        }
    		}
    	}	

		function validateImage(image) {
		    // check the type
		    var validTypes = ['image/jpeg', 'image/png', 'image/gif'];
		    if (validTypes.indexOf( image.type ) === -1) {
		        alert("Invalid File Type");
		        return false;
		    }
		    // check the size
		    var maxSizeInBytes = 10e6; // 10MB
		    if (image.size > maxSizeInBytes) {
		        alert("File too large");
		        return false;
		    }
		    return true;
		}
		function previewAnduploadImage(image) {
			if(user_group!="FREE"){

		    // container
		    if (image) {
		    			previewImage.style.width = "";
        				previewImage.style.height = "";
						const reader = new FileReader();
						previewDefaultText.style.display = "none";
						previewImage.style.display = "block";
						reader.addEventListener("load", function() {
							previewImage.addEventListener("load", function() {
								initialW = this.width;
								initialY = this.height;
								rate = initialW/initialY;
								document.getElementById("width_size").value = this.width;
								document.getElementById("scale_width_size").value = this.width;
								document.getElementById("height_size").value = this.height;
								document.getElementById("scale_height_size").value = this.height;
								document.getElementById("full_size_text").innerHTML = this.width + " X " + this.height;
							});
							previewImage.setAttribute("src", this.result);
						});
						reader.readAsDataURL(image);
					} else {
						previewDefaultText.style.display = null;
						previewImage.style.display = null;
						previewImage.setAttribute("src", "")
					}
				}else{
					Swal.fire("This is a PRO Feature","In order to use this feature, please upgrade to PRO.","error")
					$("#file_name_text").html("")
					$("#change_file_name").css("display","none")
				}
		}
		dropArea.addEventListener('drop', handleDrop, false);
		function handleFiles(files) {
		    for (var i = 0, len = files.length; i < len; i++) {
		        if (validateImage(files[i]))
		            previewAnduploadImage(files[i]);
		    }
		}

		//Filter Functions
		let blur_num = document.getElementById("blur_customRange").value;
		let blurStatus = document.getElementById("blur_control").checked;
		let grayscale_num = document.getElementById("grayscale_customRange").value;
		let grayscaleStatus = document.getElementById("grayscale_control").checked;
		let brightness_num = document.getElementById("brightness_customRange").value;
		let brightnessStatus = document.getElementById("brightness_control").checked;
		let contrast_num = document.getElementById("contrast_customRange").value;
		let contrastStatus = document.getElementById("contrast_control").checked;
		let invert_num = document.getElementById("invert_customRange").value;
		let invertStatus = document.getElementById("invert_control").checked;
		let saturate_num = document.getElementById("saturate_customRange").value;
		let saturateStatus = document.getElementById("saturate_control").checked;
		let sepia_num = document.getElementById("sepia_customRange").value;
		let sepiaStatus = document.getElementById("sepia_control").checked;
		let opacity_num = document.getElementById("opacity_customRange").value;
		let opacityStatus = document.getElementById("opacity_control").checked;
		let huerotate_num = document.getElementById("huerotate_customRange").value;
		let huerotateStatus = document.getElementById("huerotate_control").checked;
		function huerotateRangechange() {
			if (huerotateStatus) {
				huerotate_num = document.getElementById("huerotate_customRange").value;
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";
				}
			} else {
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate(0deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";
				}
			}
		}
		function handleHuerotate() {
			huerotateStatus = document.getElementById("huerotate_control").checked;
			if (huerotateStatus) {
				document.getElementById("huerotate_range").style.display = "block";
			} else {
				document.getElementById("huerotate_range").style.display = "none";
				huerotate_num = 0;
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate(0deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";;
				}
			}
		}
		function opacityRangechange() {
			if (opacityStatus) {
				opacity_num = document.getElementById("opacity_customRange").value;
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";
				}
			} else {
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity(100%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";;
				}
			}
		}
		function handleOpacity() {
			opacityStatus = document.getElementById("opacity_control").checked;
			if (opacityStatus) {
				document.getElementById("opacity_range").style.display = "block";
			} else {
				document.getElementById("opacity_range").style.display = "none";
				opacity_num = 100;
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity(100%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";;
				}
			}
		}
		function sepiaRangechange() {
			if (sepiaStatus) {
				sepia_num = document.getElementById("sepia_customRange").value;
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";
				}
			} else {
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia(0%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";;
				}
			}
		}
		function handleSepia() {
			sepiaStatus = document.getElementById("sepia_control").checked;
			if (sepiaStatus) {
				document.getElementById("sepia_range").style.display = "block";
			} else {
				document.getElementById("sepia_range").style.display = "none";
				sepia_num = 0;
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia(0%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";;
				}
			}
		}
		function saturateRangechange() {
			if (saturateStatus) {
				saturate_num = document.getElementById("saturate_customRange").value;
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";
				}
			} else {
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate(100%)"
												+ " " + "invert("+invert_num+"%)";;
				}
			}
		}
		function handleSaturate() {
			saturateStatus = document.getElementById("saturate_control").checked;
			if (saturateStatus) {
				document.getElementById("saturate_range").style.display = "block";
			} else {
				document.getElementById("saturate_range").style.display = "none";
				saturate_num = 100;
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate(100%)"
												+ " " + "invert("+invert_num+"%)";;
				}
			}
		}
		function invertRangechange() {
			if (invertStatus) {
				invert_num = document.getElementById("invert_customRange").value;
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";
				}
			} else {
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert(0%)";;
				}
			}
		}
		function handleInvert() {
			invertStatus = document.getElementById("invert_control").checked;
			if (invertStatus) {
				document.getElementById("invert_range").style.display = "block";
			} else {
				document.getElementById("invert_range").style.display = "none";
				invert_num = 0;
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert(0%)";;
				}
			}
		}
		function contrastRangechange() {
			if (contrastStatus) {
				contrast_num = document.getElementById("contrast_customRange").value;
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";
				}
			} else {
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast(100%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";;
				}
			}
		}
		function handleContrast() {
			contrastStatus = document.getElementById("contrast_control").checked;
			if (contrastStatus) {
				document.getElementById("contrast_range").style.display = "block";
			} else {
				document.getElementById("contrast_range").style.display = "none";
				contrast_num = 100;
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast(100%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";;
				}
			}
		}
		function brightnessRangechange() {
			if (brightnessStatus) {
				brightness_num = document.getElementById("brightness_customRange").value;
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";
				}
			} else {
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness(100%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";;
				}
			}
		}
		function handleBrightness() {
			brightnessStatus = document.getElementById("brightness_control").checked;
			if (brightnessStatus) {
				document.getElementById("brightness_range").style.display = "block";
			} else {
				document.getElementById("brightness_range").style.display = "none";
				brightness_num = 100;
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness(100%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";;
				}
			}
		}
		function grayscaleRangechange() {
			if (grayscaleStatus) {
				grayscale_num = document.getElementById("grayscale_customRange").value;
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";
				}
			} else {
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale(0%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";;
				}
			}
		}
		function handleGrayscale() {
			grayscaleStatus = document.getElementById("grayscale_control").checked;
			if (grayscaleStatus) {
				document.getElementById("grayscale_range").style.display = "block";
			} else {
				document.getElementById("grayscale_range").style.display = "none";
				grayscale_num = 0;
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale(0%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";;
				}
			}
		}
		function blurRangechange() {
			if (blurStatus) {
				blur_num = document.getElementById("blur_customRange").value;
				if (previewImage) {
					previewImage.style.filter = "blur("+blur_num+"px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";
				}
			} else {
				if (previewImage) {
					previewImage.style.filter = "blur(0px)" 
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";
				}
			}
		}
		function handleBlur() {
			blurStatus = document.getElementById("blur_control").checked;
			if (blurStatus) {
				document.getElementById("blur_range").style.display = "block";
				// console.log(blur_num,grayscale_num,brightness_num,contrast_num,huerotate_num,opacity_num,sepia_num,saturate_num,invert_num);
			} else {
				document.getElementById("blur_range").style.display = "none";
				blur_num = 0;
				if (previewImage) {
					previewImage.style.filter = "blur(0px)"
												+ " " + "grayscale("+grayscale_num+"%)" 
												+ " " + "brightness("+brightness_num+"%)"
												+ " " + "contrast("+contrast_num+"%)"
												+ " " + "hue-rotate("+huerotate_num+"deg)"
												+ " " + "opacity("+opacity_num+"%)"
												+ " " + "sepia("+sepia_num+"%)"
												+ " " + "saturate("+saturate_num+"%)"
												+ " " + "invert("+invert_num+"%)";
				}
			}
		}
		function downloadFilterImg() {
			var oImage = document.getElementById("image_preview_image");
		    var canvas = document.createElement("canvas");
		    var link = document.createElement('a');
  			
  			document.body.appendChild(link);
		    link.appendChild(canvas);
		    if (typeof canvas.getContext == "undefined" || !canvas.getContext) {
		        alert("browser does not support this action, sorry");
		        return false;
		    }
		    try {
		        var context = canvas.getContext("2d");
		        var width = oImage.width;
		        var height = oImage.height;
		        canvas.width = width;
		        canvas.height = height;
		        context.filter = "hue-rotate("+huerotate_num+"deg)" + "blur("+blur_num+"px)" + "opacity("+opacity_num+"%)" + "sepia("+sepia_num+"%)" + "saturate("+saturate_num+"%)" + "invert("+invert_num+"%)" + "contrast("+contrast_num+"%)" + "brightness("+brightness_num+"%)" + "grayscale("+grayscale_num+"%)";
		        context.drawImage(oImage, 0, 0, width, height);
		        var rawImageData = canvas.toDataURL("image/jpeg");
		        if (rawImageData.length > 10) {
		        	link.href = rawImageData;
					link.download = 'download_filter.jpg';
					link.click();
					link.removeChild(canvas)
			        document.body.removeChild(link);
		        } else {
		        	alert("Selece Image...")
		        }
		    }
		    catch (err) {
		        document.body.removeChild(canvas);
		    }

		    return true;
		}
		// Load from Drop Box
		function showDropBoxPicker(e){
			e.preventDefault();
			e.stopImmediatePropagation();
			
			dropins.choose({

				success: function(files) {
					loader(true);
					if(user_group!="FREE"){
						file_name.innerHTML = files[0].name;
					}
					link = files[0].link;
					fetch(link)
					.then(resp => resp.blob())
					.then(blob => {
						loader(false);
						previewAnduploadImage(blob);
					})
					.catch(r => r.json())
					.catch(e => console.log(e));
				},
				cancel: function() {
					loader(false);
				},
				linkType: "direct", // or "direct"
				multiselect: false, // or true
				extensions: [".jpg", '.png', '.gif', '.jpeg'],
				folderselect: false, // or true
			})
		}
		// Load from Google Drive
		
		// Load from One Drive
		var onetoken;
		function launchOneDrivePicker(e){
			e.preventDefault();
			e.stopImmediatePropagation();
			OneDrive.open({
				clientId: "57070809-80a4-45a6-b53c-0d24ae4c3b71",
				action: "download",
				multiSelect: false,
				advanced: {
					redirectUri: 'https://websoft365.com'
				},
				success: function(files) { 
					const url = files.value[0]['@microsoft.graph.downloadUrl'];
					onetoken = files.accessToken;
					localStorage.setItem('onedrive_token', files.accessToken);
					fetch(url, {
						method: "GET"
					})
					.then(resp => resp.blob())
					.then(blob => {
						previewAnduploadImage(blob);
					})
					.catch(error => error.json())
					.catch(err => {
						alert('sorry this image is not downloadable');
					});
				},
				cancel: function() { 

				},
				error: function(error) {
					alert(error);
				}
			});
		}

		function checkUserGroup(){
			jsonData["userid"] = String(document.location.href.split("userid=")[1])
			window.parent.$.ajax({
				type: "post",
				url: "../backend/index.php?action=getUserDetailsById",
				data: {
				data: JSON.stringify(jsonData)
				},
				success: function (response) {
				console.log(response);
				if(response.status == "OK"){
					user_group = response.users.group_type
				}
				}
			})
		}

		function largeFileUpload(url, file) {
			const range = `bytes ${0}-${file.size-1}/${file.size}`;
			fetch(url, {
				method: "PUT",
				headers: new Headers({
					'Content-Length': file.size,
					'Content-Range': range,
				}),
				body: file
			})
			.then(resp => resp.json())
			.then(resp => {
				console.log(resp);
			})
			.catch(err => {
				console.log(err);
			});
		}
		function uploadToDropBox() {
			var link = document.getElementById("saveDropBox");
			var oImage = document.getElementById("image_preview_image");
		    var canvas = document.createElement("canvas");
		    if (typeof canvas.getContext == "undefined" || !canvas.getContext) {
		        alert("browser does not support this action, sorry");
		        return false;
		    }
		    try {
		        var context = canvas.getContext("2d");
		        var width = oImage.width;
		        var height = oImage.height;
		        canvas.width = width;
		        canvas.height = height;
		        if (sizeUnit) {
		        	canvas.style.width = width + sizeUnit;
		        	canvas.style.height = height + sizeUnit;
		        } else {
		        	canvas.style.width = width + 'px';
		        	canvas.style.height = height + 'px';
		        }
		        context.drawImage(oImage, 0, 0, width, height);
		        let target_format;
		        if (format) {
		        	target_format = "image/" + format;
		        } else {
		        	target_format = "image/png";
		        }
		        var rawImageData = canvas.toDataURL(target_format);
		        rawImageData = rawImageData.replace("image/png", target_format);
		        link.href = rawImageData;
		        const options = {
					files: [
						{url: rawImageData, filename: dataURLtoBlob(rawImageData).name}
					],
					success: function() {
						Swal.fire("Success","Your image has been successfully uploaded to Dropbox!","success") 
					},
					cancel: function() {
					},
					error: function(error) {
						Swal.fire("Error","An error has occured!","error") 
					}
				}
				if(user_group!="FREE"){
					dropins.save(options);
				}else{
					Swal.fire("This is a PRO Feature","In order to use this feature, please upgrade to PRO.","error")
				}
		    }
		    catch (err) {
		    }
		}
		// upload to google drive
		function loadPickerToGoogle() {
			if(gapi.load('auth', {'callback': onAuthApiLoad})){
				eventFire(document.getElementById('googleDriveUploadButton'), 'click');
				return true;
			}
		}

		function eventFire(el, etype){
			if (el.fireEvent) {
			  el.fireEvent('on' + etype);
			} else {
			  var evObj = document.createEvent('Events');
			  evObj.initEvent(etype, true, false);
			  el.dispatchEvent(evObj);
			}
		  }
		
		function onAuthApiLoad() {
			window.gapi.auth.authorize(
			{
				'client_id': clientId,
				'scope': scope,
				'immediate': false
			},
			handleAuthResultToGoogle);
		}
		function handleAuthResultToGoogle(authResult) {
			if (authResult && !authResult.error) {
				oauthToken = authResult.access_token;
			}
		}
		function uploadImgToGoogle() {
			var oImage = document.getElementById("image_preview_image");
		    var canvas = document.createElement("canvas");
		    document.body.appendChild(canvas);
		    if (typeof canvas.getContext == "undefined" || !canvas.getContext) {
		        alert("browser does not support this action, sorry");
		        return false;
		    }
		    try {
		        var context = canvas.getContext("2d");
		        var width = oImage.width;
		        var height = oImage.height;
		        canvas.width = width;
		        canvas.height = height;
		        if (sizeUnit) {
		        	canvas.style.width = width + sizeUnit;
		        	canvas.style.height = height + sizeUnit;
		        } else {
		        	canvas.style.width = width + 'px';
		        	canvas.style.height = height + 'px';
		        }
		        context.drawImage(oImage, 0, 0, width, height);
		        let target_format;
		        if (format) {
		        	target_format = "image/" + format;
		        } else {
		        	target_format = "image/png"
				}
				if(user_group=="FREE"){
					Swal.fire("This is a PRO Feature","In order to use this feature, please upgrade to PRO.","error")
					return true;
				}
		        var rawImageData = canvas.toDataURL(target_format);
		        rawImageData = rawImageData.replace("image/png", target_format);
		        if(oauthToken) {
					//upload to goole drive
					uploadToGooleDrive(dataURLtoBlob(rawImageData));
				} else {
					loadPickerToGoogle(dataURLtoBlob(rawImageData));
				}
				document.body.removeChild(canvas);
		    }
		    catch (err) {
		        document.body.removeChild(canvas);
		        // alert("Sorry, can't upload");
		    }
		    return true;
		}
		function uploadToGooleDrive(file) {
			// As a sample, upload a text file.
			var metadata = {
				'name': file.name, // Filename at Google Drive
				'mimeType': file.type, // mimeType at Google Drive
			};

			var accessToken = oauthToken; // Here gapi is used for retrieving the access token.
			var form = new FormData();
			form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
			form.append('file', file);
			fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
				method: 'POST',
				headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
				body: form,
			}).then((res) => {
				return res.json();
			}).then(function(val) {
				console.log(val);
				Swal.fire("Success","Your image has been successfully uploaded to Google Drive!","success") 
			})
			.catch(err => console.log(err));
		}
		//helper function that convert DataURL to BLOB make uploadable to server
		function dataURLtoBlob(dataurl) {
			var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
			while(n--){
				u8arr[n] = bstr.charCodeAt(n);
			}
			const blob = new Blob([u8arr], {type:mime})
			blob.name = new Date().getUTCMilliseconds()+'-compresssed_file.'+mime.split('/')[1];
			return blob;
		}
		function loader(show=false) {
			//loader 
			const loader = document.querySelector('.lds-roller');
			if(show) {
				loader.style.display = "inline-block";
			} else {
				loader.style.display = "none";
			}
		}
		