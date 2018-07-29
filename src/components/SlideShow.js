import ImageGallery from 'react-image-gallery';
import firebase from './firebase.js'; // <--- add this line
import React, { Component } from 'react';



const images = [
    {
      original: "https://firebasestorage.googleapis.com/v0/b/snaps-b05fb.appspot.com/o/4aec5ce4-6797-4464-850a-ca222ad1c951?alt=media&token=b708d64c-f538-4e41-9dc7-c5a43617d3fe",
      thumbnail: "https://firebasestorage.googleapis.com/v0/b/snaps-b05fb.appspot.com/o/4aec5ce4-6797-4464-850a-ca222ad1c951?alt=media&token=b708d64c-f538-4e41-9dc7-c5a43617d3fe",
    },
    {
      original: "https://firebasestorage.googleapis.com/v0/b/snaps-b05fb.appspot.com/o/4aec5ce4-6797-4464-850a-ca222ad1c951?alt=media&token=b708d64c-f538-4e41-9dc7-c5a43617d3fe",
      thumbnail: "https://firebasestorage.googleapis.com/v0/b/snaps-b05fb.appspot.com/o/4aec5ce4-6797-4464-850a-ca222ad1c951?alt=media&token=b708d64c-f538-4e41-9dc7-c5a43617d3fe"
    },
    {
      original: "https://firebasestorage.googleapis.com/v0/b/snaps-b05fb.appspot.com/o/4aec5ce4-6797-4464-850a-ca222ad1c951?alt=media&token=b708d64c-f538-4e41-9dc7-c5a43617d3fe",
      thumbnail: "https://firebasestorage.googleapis.com/v0/b/snaps-b05fb.appspot.com/o/4aec5ce4-6797-4464-850a-ca222ad1c951?alt=media&token=b708d64c-f538-4e41-9dc7-c5a43617d3fe"
    }
  ]


  class SlideShow extends Component {
  
    constructor () {
      super()
      this.state = {
        images: null
      }
    }
    componentDidMount(){
      var user = firebase.auth().currentUser;
      var self = this;
      if (user != null) {
      
      }else{
        firebase
        .auth()
        .signInAnonymouslyAndRetrieveData()
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        }).then(function() {
          let userObj = { userName: "test web", password: "foo" };
  
          firebase
          .database()
          .ref(`feeds/feedNew/foo/members/${firebase.auth().currentUser.uid}`)
          .set(userObj, function(error) {
            if (error) alert("Error");
            else {
              
              const itemsRef = firebase.database().ref('feeds/feedNew/foo/uploads');
  
              itemsRef.on('value', (snapshot) => {
                let items = snapshot.val();
                let newState = [];
                for (let item in items) {
                  newState.push(
                    {original: items[item].uri, thumbnail :items[item].uri},
                  );
                }
                self.setState({
                  images: newState
                });
              });
  
            }
          });
        });
      }
  
  
  
    }
    render() {
      let {images} = this.state;
      console.log(JSON.stringify(images))
      return (
        <div>
  {this.state.images &&
    <ImageGallery 
    showThumbnails={false}
    items={images} />}
        </div>
      );
    }
  }
  export default SlideShow;