import React, { PureComponent } from 'react'
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StyleSheet,
  Dimensions,
  Text
} from 'react-native'
import {PressableOpacity} from 'react-native-pressable-opacity';
import { changeEmojiText } from './utils'
const { width } = Dimensions.get('window')

export default class TextMessage extends PureComponent {
  render () {
    const { isSelf, message, messageErrorIcon, views, isOpen, rightMessageBackground, leftMessageBackground, reSendMessage, chatType, isReadStyle, showIsRead, ImageComponent } = this.props
    return (
      <View
        style={[isSelf ? styles.right : styles.left]}
        collapsable={false}
        ref={(e) => (this[`item_${this.props.rowId}`] = e)}
      >
        <View
          style={
            [
              styles.triangle,
              isSelf
                ? styles.right_triangle
                : styles.left_triangle,
              { borderColor: isSelf ? rightMessageBackground : leftMessageBackground }
            ]}
        />
        <PressableOpacity
          disabled={isOpen}
          onLongPress={() => {
            this.props.onMessageLongPress(message.type, parseInt(this.props.rowId), message)
          }}
          onPress={() => {
            this.props.onMessagePress(message.type, parseInt(this.props.rowId),  message)
          }}
        >
          <View style={[styles.container, { backgroundColor: isSelf ? rightMessageBackground
              : leftMessageBackground }]}>
            {views}
          </View>
          {chatType !== 'group' && isSelf && showIsRead && (
            <Text style={[{ textAlign: 'right', fontSize: 13 }, isReadStyle]}>
              {this.props.lastReadAt && this.props.lastReadAt - message.time > 0 ? '已读' : '未读'}
            </Text>
          )}
        </PressableOpacity>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
          {!isSelf
            ? null
            : message.sendStatus === undefined
              ? null
              : message.sendStatus === 0
                ? <ActivityIndicator />
                : message.sendStatus < 0
                  ? <PressableOpacity
                    disabled={false}
                    onPress={() => {
                      if (message.sendStatus === -2) {
                        reSendMessage(message)
                      }
                    }}>
                    {messageErrorIcon ? messageErrorIcon : <ImageComponent source={require('../source/image/waring.png')} style={{ width: 20, height: 20 }} />}
                  </PressableOpacity>
                  : null
          }
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    maxWidth: width - 160,
    minHeight: 20,
  },

  subEmojiStyle: {
    width: 25,
    height: 25
  },
  triangle: {
    width: 0,
    height: 0,
    zIndex: 999,
    borderWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderColor: '#fff',
    marginTop: 16
  },
  left_triangle: {
    borderLeftWidth: 0,
    borderRightWidth: Platform.OS === 'android' ? 6 : 10,
    marginLeft: 5
  },
  right_triangle: {
    borderRightWidth: 0,
    borderLeftWidth: Platform.OS === 'android' ? 6 : 10,
    borderColor: '#a0e75a',
    marginRight: 5
  },
  right: {
    flexDirection: 'row-reverse',
  },
  left: {
    flexDirection: 'row',
  }
})
