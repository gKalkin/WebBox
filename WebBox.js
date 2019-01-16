// WebBox
//
// @author Garrett Myers
//
// A script that allows for dynamic creation of of WebBox
// HTML elements. WebBox elements can be dragged anywhere
// in the browser and resized from any corner or edge. 
// Resizing works in the traditional fashion and WebBoxes
// have minimum dimensions of 20x20 pixels. Each WebBox
// is uniqely identified by a number in the top middle of 
// the box.

document.onmousedown = function(e) {
	if(!e) return;
	if(e.target.classList.contains("WebBox") 
		|| e.target.classList.contains("corner")
		|| e.target.classList.contains("edge")) return;
		
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

		e.preventDefault();
		console.log(e.target)

		initX = e.clientX - offsetX;
		initY = e.clientY - offsetY;

		document.onmouseup = endDrag;
		document.onmousemove = drag;
		box.style.zIndex = "9";
		box.style.border = "3px solid yellow";
		box.classList.add("grabbing");
		box.classList.remove("grab");

		boxes = document.getElementsByClassName("WebBox");
		
		var i;

		for (i = 0; i < boxes.length; i++) {
			if (boxes[i].id == box.id) continue;

			boxes[i].style.zIndex = "1";
			boxes[i].style.border = "3px solid black";
		}
		return false;
	}

	function endDrag(e) {
		if(!e) return;
		e.preventDefault();
		document.onmousemove = null;
		document.onmouseup = null;
		box.classList.add("grab");
		box.classList.remove("grabbing");

		return false;
	}

	function drag(e) {
		if(!e) return;
		e.preventDefault();

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

	//called on mousemove events when a corner or edge is selected.
	function resizeBox(e) {
		if(!e) return;
		e.preventDefault();

		var offsetX = e.clientX - mouseInitX;
		var offsetY = e.clientY - mouseInitY;

		if(selEdgeVert.classList.contains("topLeft")) {
			updateHeight(height, offsetY, true);
			updateWidth(width, offsetX, true);
		} else if(selEdgeVert.classList.contains("topRight")) {
			updateHeight(height, offsetY, true);
			updateWidth(width, offsetX, false);
		} else if(selEdgeVert.classList.contains("bottomLeft")) {
			updateHeight(height, offsetY, false);
			updateWidth(width, offsetX, true);
		} else if (selEdgeVert.classList.contains("bottomRight")){
			updateHeight(height, offsetY, false);
			updateWidth(width, offsetX, false);
		} else if(selEdgeVert.classList.contains("up")) {
			updateHeight(height, offsetY, true);
		} else if(selEdgeVert.classList.contains("down")) {
			updateHeight(height, offsetY, false);
		} else if(selEdgeVert.classList.contains("right")) {
			updateWidth(width, offsetX, false);
		} else {
			updateWidth(width, offsetX, true);
		}
	}

	function updateHeight(boxHeight, offset, dragUp) {
		var newHeight = 0;

		if(dragUp) {
			newHeight = boxHeight - offset;
			if(newHeight <= minDimension) return;
			box.style.top = yBox + offset + "px";
		} else {
			newHeight = boxHeight + offset;
			if(newHeight <= minDimension) return;
		}

		box.style.height = newHeight + "px";
	}

	function updateWidth(boxWidth, offset, dragLeft) {
		var newWidth = 0;

		if(dragLeft) {
			newWidth = boxWidth - offset;
			if(newWidth <= minDimension) return;
			box.style.left = xBox + offset + "px";
		} else {
			newWidth = boxWidth + offset;
			if(newWidth <= minDimension) return;
		}

		box.style.width = newWidth + "px";
	}

	//Called on mouseup events when finished resizing.
	function endResize(e) {
		if(!e) return;
		e.preventDefault();
		document.onmousemove = null;
		document.onmouseup = null;
	}
}

var spawn = document.getElementById("spawn");
spawn.onmousedown = spawnBox;
var boxId = 0;

//	spawnBox
//	e - Event triggered by pressing the '+' button 
//		defined in WebBox.htm
//
//	Description:
//		Allows for the dynamic creation of WebBox
//		elements.
function spawnBox(e) {
	if(!e) return;
	e.preventDefault();

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

	//Assign each WebBox a unique id
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

	//Add resizing areas to the WebBox
	newBox.appendChild(text);
	newBox.appendChild(topLeft); 
	newBox.appendChild(topRight); 
	newBox.appendChild(bottomLeft); 
	newBox.appendChild(bottomRight);
	newBox.appendChild(up);
	newBox.appendChild(down);
	newBox.appendChild(right);
	newBox.appendChild(left);

	//Initialize event listeners
	dragBox(newBox);
	resize(newBox);

	document.body.appendChild(newBox); 
}