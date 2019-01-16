// This is the JS file for the WebBox project.
var box = document.querySelector("#box1");

dragBox(box);
dragBox(document.querySelector("#box2"));

document.onmousedown = function(e) {
	//if(!e) return;
	boxes = document.getElementsByClassName("WebBox")
	if(e.target.className == "WebBox") return;

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
		if(!e) return;

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
		//if(!e) return;
		document.onmousemove = null;
		document.onmouseup = null;
	}

	function drag(e) {
		//if(!e) return;

		currentX = e.clientX - initX;
		currentY = e.clientY - initY;

		offsetX = currentX;
		offsetY = currentY;

		box.style.transform = "translate(" + currentX + "px, " + currentY + "px)"  
	}
}

function resize(corner) {
	var mouse_initX,
		mouse_initY,
		curr_mouseX,
		curr_mouseY,
		box 		= corner.parentElement,
		rect 		= box.getBoundingClientRect,
		boxHeight 	= rect.height,
		boxWidth 	= rect.width,
		boxTop 		= rect.top,
		boxLeft 	= rect.left;

		function startResize(e) {

		}

		function endResize(e) {

		}

		function resizeDrag(e) {

		}
}