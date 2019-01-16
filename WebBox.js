// This is the JS file for the WebBox project.
var box = document.querySelector("#box1");

dragBox(box);
dragBox(document.querySelector("#box2"));

document.onmousedown = function(e) {
	//if(!e) return;
	boxes = document.getElementsByClassName("WebBox")
	if(e.target.className == "WebBox" || e.target.classList.contains("corner")) return;

	box.style.zIndex = "1";
	document.querySelector("#box2").style.zIndex = "1";

	box.style.backgroundColor = "red";
	document.querySelector("#box2").style.backgroundColor = "red";
}

function dragBox(box) {
	var initX,
		initY,
		currentX,
		currentY,
		offsetX = 0,
		offsetY = 0;

	if(!box) return;

	box.onmousedown = startDrag;

	function startDrag(e) {
		if(!e || e.target.classList.contains("corner")) return;
		console.log(e.target)

		initX = e.clientX - offsetX;
		initY = e.clientY - offsetY;

		//Add event listeners to document for anticipated drag.
		document.onmouseup = endDrag;
		document.onmousemove = drag;
		box.style.zIndex = "9";
		box.style.backgroundColor = "blue";

		boxes = document.getElementsByClassName("WebBox");
		
		var i;

		for (i = 0; i < boxes.length; i++) {
			if (boxes[i].id == box.id) continue;

			boxes[i].style.zIndex = "1";
			boxes[i].style.backgroundColor = "red";
		}
	}

	function endDrag(e) {
		if(!e) return;
		document.onmousemove = null;
		document.onmouseup = null;
	}

	function drag(e) {
		if(!e) return;

		currentX = e.clientX - initX;
		currentY = e.clientY - initY;

		offsetX = currentX;
		offsetY = currentY;

		box.style.transform = "translate(" + currentX + "px, " + currentY + "px)"  
	}
}

resize(document.getElementsByClassName("topLeft")[0]);

function resize(corner) {
	var mouse_initX,
		mouse_initY,
		curr_mouseX,
		curr_mouseY,
		offsetX		= 0,
		offsetY		= 0,
		box 		= corner.parentElement,
		rect 		= box.getBoundingClientRect(),
		boxHeight 	= rect.height,
		boxWidth 	= rect.width,
		boxTop 		= rect.top,
		boxLeft 	= rect.left,
		minBounds 	= 30;

		corner.onmousedown = startResize;

		function startResize(e) {
			if(!e) return;

			mouse_initX = e.clientX - offsetX;
			mouse_initY = e.clientY - offsetY;

			document.onmouseup = endResize;
			document.onmousemove = resizeDrag;
			box.style.zIndex = "9";
			box.style.backgroundColor = "blue";

			boxes = document.getElementsByClassName("WebBox");
		
			var i;

			for (i = 0; i < boxes.length; i++) {
				if (boxes[i].id == box.id) continue;

				boxes[i].style.zIndex = "1";
				boxes[i].style.backgroundColor = "red";
			}
		}

		function endResize(e) {
			if(!e) return;

			document.onmousemove = null;
			document.onmouseup = null;
		}

		function resizeDrag(e) {
			if(!e) return;

			cornerClass = corner.classList
			curr_mouseX = e.clientX;
			curr_mouseY = e.clientY;
			offsetX = curr_mouseX - mouse_initX;
			offsetY = curr_mouseY - mouse_initY;


			if(cornerClass.contains("topLeft")) {
				console.log("box height: " + boxHeight) 
				console.log("init mouse: " + mouse_initY)
				console.log("current mouse: " + curr_mouseY)
				console.log()
				height = boxHeight - (curr_mouseY - mouse_initY);
				width = boxWidth - (curr_mouseX - mouse_initX);

				if(height > minBounds) {
					box.style.top = (boxTop + (curr_mouseY - mouse_initY)) + "px"
					box.style.height = height + "px"
				}
			} else if( cornerClass.contains("topRight")) {

			} else if (cornerClass.contains("bottomLeft")) {

			} else {

			}

		}
}