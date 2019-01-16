// This is the JS file for the WebBox project.

document.onmousedown = function(e) {
	if(!e) return;
	if(e.target.className == "WebBox" 
		|| e.target.classList.contains("corner")) return;
		
	boxes = document.getElementsByClassName("WebBox")

	var i;

	for (i = 0; i < boxes.length; i++) {
		boxes[i].style.zIndex = "1";
		boxes[i].style.border = "3px solid black";
	}
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
		if(!e 
			|| e.target.classList.contains("corner")
			|| e.target.classList.contains("edge")) return;
		console.log(e.target)

		initX = e.clientX - offsetX;
		initY = e.clientY - offsetY;

		//Add event listeners to document for anticipated drag.
		document.onmouseup = endDrag;
		document.onmousemove = drag;
		box.style.zIndex = "9";
		box.style.border = "3px solid yellow";

		boxes = document.getElementsByClassName("WebBox");
		
		var i;

		for (i = 0; i < boxes.length; i++) {
			if (boxes[i].id == box.id) continue;

			boxes[i].style.zIndex = "1";
			boxes[i].style.border = "3px solid black";
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

function resize(box) {
	var selEdgeVert,
		rect,
		height 			= 0,
		width 			= 0,
		xBox 			= 0,
		yBox 			= 0,
		mouseInitX 		= 0;
		mouseInitY 		= 0;
		minDimension 	= 20;
		edgeVerts 		= box.children;

	var i;

	for(i = 0; i < edgeVerts.length; i++) {
		edgeVerts[i].onmousedown = startDrag;
	}

	function startDrag(e) {
		if(!e) return;
		e.preventDefault();

		selEdgeVert = e.target;

		//Rectangle dimensions.
		rect = box.getBoundingClientRect();
		height = rect.height;
		width = rect.width;

		//Need previous top and left offset values to move upper left corner.
		xBox = parseInt(getComputedStyle(box, null).getPropertyValue("left"));
		yBox = parseInt(getComputedStyle(box, null).getPropertyValue("top"));;

		//Needed to calculate offset.
		mouseInitX = e.clientX;
		mouseInitY = e.clientY;

		console.log(box.getBoundingClientRect());

		//Bring box to front and indicate it has been selected.
		box.style.zIndex = "9";
		box.style.border = "3px solid yellow";

		document.onmousemove = resizeBox;
		document.onmouseup = endResize;
	}

	function resizeBox(e) {
		if(!e) return;

		var offsetX = e.clientX - mouseInitX;
		var offsetY = e.clientY - mouseInitY;

		if(selEdgeVert.classList.contains("topLeft")) {
			var newWidth = width - offsetX;
			var newHeight = height - offsetY;

			if(newWidth > minDimension) {
				box.style.width = newWidth + "px";
				console.log(xBox + offsetX + "px");
				box.style.left = xBox + offsetX + "px";
			}

			if(newHeight > minDimension) {
				box.style.height = newHeight + "px";
				box.style.top = yBox + offsetY + "px";
			}
			console.log("Moving top left");
		} else if(selEdgeVert.classList.contains("topRight")) {
			var newWidth = width + offsetX;
			var newHeight = height - offsetY;

			if(newWidth > minDimension) {
				box.style.width = newWidth + "px";
			}

			if(newHeight > minDimension) {
				box.style.height = newHeight + "px";
				box.style.top = yBox + offsetY + "px";
			}
			console.log("Moving top right");
		} else if(selEdgeVert.classList.contains("bottomLeft")) {
			var newWidth = width - offsetX;
			var newHeight = height + offsetY;

			if(newWidth > minDimension) {
				box.style.width = newWidth + "px";
				box.style.left = xBox + offsetX + "px";
			}

			if(newHeight > minDimension) {
				box.style.height = newHeight + "px";
			}

			console.log("Moving bottom left");
		} else if (selEdgeVert.classList.contains("bottomRight")){
			var newWidth = width + offsetX;
			var newHeight = height + offsetY;

			if(newWidth > minDimension) {
				box.style.width = newWidth + "px";
			}

			if(newHeight > minDimension) {
				box.style.height = newHeight + "px";
			}
			console.log("Moving bottom right");
		} else if(selEdgeVert.classList.contains("up")) {
			var newHeight = height - offsetY;

			if(newHeight > minDimension) {
				box.style.height = newHeight + "px";
				box.style.top = yBox + offsetY + "px";
			}
		} else if(selEdgeVert.classList.contains("down")) {
			var newHeight = height + offsetY;

			if(newHeight > minDimension) {
				box.style.height = newHeight + "px";
			}
		} else if(selEdgeVert.classList.contains("right")) {
			var newWidth = width + offsetX;

			
			if(newWidth > minDimension) {
				box.style.width = newWidth + "px";
			}
		} else {

		}
	}

	function endResize(e) {
		console.log("end resize");
		document.onmousemove = null;
		document.onmouseup = null;
	}


}

var spawn = document.getElementById("spawn");

spawn.onmousedown = spawnBox;
var boxId = 0;

function spawnBox(e) {
	var newBox 		= document.createElement("DIV"),
		topLeft 	= document.createElement("DIV"), 
		topRight 	= document.createElement("DIV"), 
		bottomLeft 	= document.createElement("DIV"), 
		bottomRight = document.createElement("DIV"),
		up 			= document.createElement("DIV"),
		down 		= document.createElement("DIV"),
		right 		= document.createElement("DIV"),
		left 		= document.createElement("DIV"),
		text 		= document.createTextNode(boxId);

	newBox.id = boxId++;

	newBox.className 		= "WebBox";
	topLeft.className 		= "corner topLeft";
	topRight.className 		= "corner topRight";
	bottomLeft.className 	= "corner bottomLeft";
	bottomRight.className 	= "corner bottomRight";
	up.className 			= "edge horizontal up";
	down.className 			= "edge horizontal down";
	right.className 		= "edge vertical right";
	left.className 			= "edge vertical left";

	newBox.style.textAlign = "center";

	newBox.appendChild(text);
	newBox.appendChild(topLeft); 
	newBox.appendChild(topRight); 
	newBox.appendChild(bottomLeft); 
	newBox.appendChild(bottomRight);
	newBox.appendChild(up);
	newBox.appendChild(down);
	newBox.appendChild(right);
	newBox.appendChild(left);


	dragBox(newBox);
	resize(newBox);

	document.body.appendChild(newBox); 

}