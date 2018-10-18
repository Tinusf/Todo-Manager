import React from "react";
import { Icon } from "expo";
import { Platform } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import Categories from '../constants/Categories';
import Colors from '../constants/Colors';

export default class TodoActionButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    // actions er hvilken handlinger du kan gjøre etter du har trykker på den store + knappen. Vi har valgt å ha kategorier her.
    // Så bruker vi konstanten vår Categories for å hente ut hvilket ikon og hvilken farge etc etc de skal ha.
    const actions = [
      {
        text: "Work",
        name: "work",
        color: "white",
        icon: 
        <Icon.Ionicons
          name={(Platform.OS === 'ios' ? "ios-" : "md-") + Categories["work"].icon}
          size={30}
          color={Categories["work"].color}
        />,
        position: 1
      },
      {
        text: "School",
        name: "school",
        color: "white",
        icon:
          <Icon.Ionicons
            name={(Platform.OS === 'ios' ? "ios-" : "md-") + Categories["school"].icon}
            size={30}
            color={Categories["school"].color}
          />,
        position: 2
      },
      {
        text: "Fun",
        name: "fun",
        color: "white",
        icon:
          <Icon.Ionicons
            name={(Platform.OS === 'ios' ? "ios-" : "md-") + Categories["fun"].icon}
            size={30}
            color={Categories["fun"].color}
          />,
        position: 3
      },
      {
        text: "Other",
        name: "other",
        color: "white",
        icon:
          <Icon.Ionicons
            name={(Platform.OS === 'ios' ? "ios-" : "md-") + Categories["other"].icon}
            size={30}
            color={Categories["other"].color}
          />,
        position: 4
      }
    ];
    return (
      <FloatingAction
        color={Colors.tintColor}
        actions={actions}
        position="right"
        onPressItem={name =>
          this.props.navigate("TodoFormModal", {
            category: name
          })
        }
      />
    );
  }
}
