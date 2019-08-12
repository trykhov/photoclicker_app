import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';

export default class CameraScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        permission: null, // asks for camera permission
        type: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off // camera light off
      }
    }

    static navigationOption = {
        title: "Camera"
    };

    async componentDidMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({permission: status === "granted"});
    };

    flipCamera = () => {
      this.setState({
        type: this.state.type === Camera.Constants.Type.back 
          ? Camera.Constants.Type.front : Camera.Constants.Type.back
      })
    };

    flashLight = () => {
      this.setState({
        flashMode: this.state.flashMode === Camera.Constants.FlashMode.off
          ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off
      })
    };

    takePic = async () => {
      if(this.camera) {
        let photo = await this.camera.takePictureAsync();
        this.props.navigation.navigate("Home", {photo: photo});
      }
    }

    render() {
      const { hasCameraPermission } = this.state;
      if(hasCameraPermission === null) {
        return <View></View>
      } else if(hasCameraPermission === false) {
        return (
          <View>
            <Text>No access to camera</Text>
          </View>
        )
      } else {
        return (
          <View style={styles.container}>
            <Camera
              style={styles.cameraView}
              type={this.state.type}
              flashMode={this.state.flashMode}
              ref={ref => this.camera = ref}
            >
              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.iconHolder} onPress={() => this.flipCamera()}>
                  <FontAwesome name="camera" size={35} style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconHolder} onPress={() => this.takePic()}>
                  <FontAwesome name="circle" size={35} style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconHolder} onPress={() => this.flashLight()}>
                  <FontAwesome name="flash" size={35} style={styles.icon}/>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        );
      }
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    cameraView: {
      flex: 1
    }, 
    actionContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "transparent"
    },
    iconHolder: {
      flex: 1,
      alignItems: "center",
      alignSelf: "flex-end"
    },
    icon: {
      marginBottom: 10,
      color: "#FFF"
    },
  });
  