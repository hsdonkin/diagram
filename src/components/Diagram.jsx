import React from 'react';
// redux
import { connect } from 'react-redux';
import {deselectAllObjects} from './../actions'
// v4
import { v4 } from 'uuid';
// konva
import { Stage, Layer, Group, Transformer } from 'react-konva';



// dynamic image layer
import ObjectImage from './ObjectImage';

class Diagram extends React.Component {
  constructor(props) {
    super(props);
    this.refs = []
    this.state = {
      objects: this.props.objects,
    }
  }


  shouldComponentUpdate = (nextProps, nextState) => {
    // need to check how many properties diagram.objects has
    // this tells us if a new thing was added to the diagram, if not don't update it
    // disabling this creates performance issues where the diagram flickers
    if (Object.keys(nextProps.diagram.objects).length === Object.keys(this.props.diagram.objects).length){
      return false
    }else{
      return true
    }
  }

  render() {
    const {deselectAllObjects} = this.props
    const refs = []
    // extract objects from the redux store diagram
    const { objects } = this.props.diagram;
    let keys = Object.keys(objects);
    let objectImagesList = [];
    keys.forEach(key => {
      refs.push(React.createRef(key))
      objectImagesList.push(
      
          <ObjectImage
            ref={key}
            key={key}
            imgName={objects[key].imgName}
            objectID = {key}
            x={objects[key].x}
            y={objects[key].y}
            rotation={objects[key].rotation}
            selected={objects[key.selected]}
            stageDimensions={{width:window.innerWidth,height:window.innerHeight}}
          />
          
       
      );
    });

    return (
      <Stage
      
        scaleX={0.5}
        scaleY={0.5}
        style={{ border: '1px whitesmoke solid' }}
        width={window.innerWidth}
        height={window.innerHeight * 0.75}
        onMouseDown={e => {
          // deselect when clicked on empty area
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            // selectShape(null);
            deselectAllObjects();
            this.forceUpdate();
          }
        }}
        onContextMenu = {
          () => {
            window.oncontextmenu = (e) => {
              setTimeout(function(){
                window.oncontextmenu = () => {
                  return true
                }
              }, 100)
              return false
            }
          }
        }
      >
        <Layer key={v4()} draggable>
        {objectImagesList}
        </Layer>
      </Stage>
    );
  }
}

const mapStateToProps = state => {
  return {
    diagram: state.diagram
  };
};

export default connect(mapStateToProps, {deselectAllObjects})(Diagram);
