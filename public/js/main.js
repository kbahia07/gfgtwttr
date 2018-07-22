$(function() {
	$("#btnSubmit").on("click", function(e) {
		e.preventDefault();

		var textareaVal = $("#inputTextarea").val();

		if (!textareaVal) return false;

		$.ajax({
			type: 'POST',
			url: '/splitMessage',
			data: { input : textareaVal },
			dataType: 'json',
			success: function(result) {
				var data = result.data;
				if (typeof data === 'string' || data instanceof String) {
					var snippet = "<p class='pMessage'>" + data + "</p>";
					$(snippet).hide().prependTo("#pDisplay").fadeIn("slow");
				} else if (data instanceof Array) {
					data.forEach(function(el){
						var snippet = "<p class='pMessage'>" + el + "</p>";
						$(snippet).hide().prependTo("#pDisplay").fadeIn("slow");
					});
				} else {
					alert("Error");
				}

				$("#inputTextarea").val("");
			},
			error: function(error) {
				console.log(error);
			},
			statusCode: {
				400: function(response) {
					$("#errorMessage").text(response.responseJSON.error);
					$(".has-error").show();
					$(".has-error").effect('shake');
				}
			}
		});
	});

	$("#inputTextarea").on("click", function(e) {
		if ($(".has-error").is(":visible")) {
			$(".has-error").hide();
			$("#inputTextarea").val("");
		}
	});

	$("#inputTextarea").on("keydown", function(e) {
		if((e.keyCode == 13 && e.metaKey) || (e.ctrlKey && e.keyCode == 13)) {
			$("#btnSubmit").trigger("click");
		}
	});
});