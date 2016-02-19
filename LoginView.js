"use strict";

var React = require("react-native");

var {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    Navigator,
    View,
} = React;
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

var TestScreen = require("./test-screen");

class LoginView extends Component {

    constructor(props) {
      super(props);
      // this.state = {
      //     username: "",
      //     password: ""
      // };
      // });
    // }
      GoogleSignin.configure({
        iosClientId: "430891231916-hej7na4spktej6ofjofis7gphtlg5op3.apps.googleusercontent.com",
        scopes: ["https://www.googleapis.com/auth/calendar"]
      });
    }
    signIn() {
      GoogleSignin.signIn()
        .then((user) => {
          console.log(user);
          this.setState({user: user});
        })
        .catch((err) => {
          console.log('WRONG SIGNIN', err);
        })
        .done();
    }
    onPressButton() {
      console.log(this)
      fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        headers: {
          "Authorization": "Bearer " + this.state.user.accessToken
        }
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          this.setState( {events: json } )
        })
    }

      render() {
        return (
          <View style={styles.container}>
            <Text style={styles.instructions}>
              Press Cmd+R to reload,{'\n'}
              Cmd+D or shake for dev menu
            </Text>
            <Text style={styles.instructions}>
              Click the button below to log in with your Google account. If you are already logged in you may not see the Google OAuth popup.
              Your user details should be logged in Chrome.
            </Text>
            <GoogleSigninButton
              style={{width: 48, height: 48}}
              size={GoogleSigninButton.Size.Icon}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.signIn.bind(this)}
            />
            <Text style={styles.instructions}>
              Once logged in, retrieve your primary calendar by clicking below.
              Watch the Chrome JS console to see the result
            </Text>

            <TouchableHighlight onPress={this.onSubmitPressed.bind(this)}>
              <Text style={styles.instructions}>
                Click here to grab calendar events
              </Text>
            </TouchableHighlight>
          </View>
        );
      }

      onSubmitPressed() {
        console.log(this);
        this.props.navigator.push({
          title: "Event List",
          component: TestScreen,
          passProps: {},
        });
      }

    }

    // render() {
    //     return (
    //         <View style={styles.container}>
    //             <Text style={styles.title}>
    //                 Sign In
    //             </Text>
    //             <View>
    //                 <TextInput
    //                     placeholder="Username"
    //                     onChange={(event) => this.setState({username: event.nativeEvent.text})}
    //                     style={styles.formInput}
    //                     value={this.state.username} />
    //                 <TextInput
    //                     placeholder="Password"
    //                     secureTextEntry={true}
    //                     onChange={(event) => this.setState({password: event.nativeEvent.text})}
    //                     style={styles.formInput}
    //                     value={this.state.password} />
    //                 <TouchableHighlight onPress={(this.onSubmitPressed.bind(this))} style={styles.button}>
    //                     <Text style={styles.buttonText}>Submit</Text>
    //                 </TouchableHighlight>
    //             </View>
    //         </View>
    //     );
    // }

    // onSubmitPressed() {
    //     this.props.navigator.push({
    //         title: "Secure Page",
    //         component: TestScreen,
    //     });
    // }
//
// };


var styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      margin: 10,
    },
    // container: {
    //     padding: 30,
    //     marginTop: 65,
    //     alignItems: "stretch"
    // },
    title: {
        fontSize: 18,
        marginBottom: 10
    },
    formInput: {
        height: 36,
        padding: 10,
        marginRight: 5,
        marginBottom: 5,
        marginTop: 5,
        flex: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#555555",
        borderRadius: 8,
        color: "#555555"
    },
    button: {
        height: 36,
        flex: 1,
        backgroundColor: "#555555",
        borderColor: "#555555",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: "center"
    },
    buttonText: {
        fontSize: 18,
        color: "#ffffff",
        alignSelf: "center"
    },
});

module.exports = LoginView;
