<template>
  <div id="chat-window" class="flex flex-column flex-auto">
    <div v-if="!id" class="flex flex-column items-center justify-center h-100">
      <p>Select a chat to start</p>
    </div>
    <div v-else class="flex flex-auto flex-column">
      <div
        class="self-stretch flex flex-column items-center justify-center has-background-white ma2 pa3"
      >
        <h1 class="title is-4">{{id.substr(1)}}</h1>
      </div>
      <div class="flex flex-auto flex-column ph4">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="[
          'mt3',
          message.author === 'ME'
            ? 'self-end'
            : 'self-start'
        ]"
        >
          <text-message
            :class="[message.author === 'ME' ? 'is-right is-white' : 'is-left is-info']"
            :textMessage="message.payload.text"
          ></text-message>
        </div>
      </div>

      <div class="has-background-white-bis pv3 ph5">
        <div class="field is-grouped">
          <div class="control">
            <div class="buttons">
              <a class="button is-info is-large is-circle">
                <span class="icon is-large">
                  <i class="fa fa-bars"></i>
                </span>
              </a>
            </div>
          </div>
          <div class="control is-expanded">
            <input
              class="input is-rounded is-large"
              type="text"
              placeholder="Type your message"
              @keyup.enter="send"
              @keydown="typingStart"
              @keyup="typingEnd"
              v-model.trim="inputText"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex";
import { TextMessage } from "@/components/messages";
const uuidv4 = require("uuid/v4");
let typingTimer = null;
const doneTypingInterval = 1500;
export default {
  name: "Chat",
  props: ["id"],
  components: {
    TextMessage
  },
  data: () => ({
    inputText: ""
  }),
  methods: {
    ...mapActions(["sendMessage"]),
    send() {
      this.inputText !== "" &&
        this.sendMessage({
          id: uuidv4(),
          type: "TEXT",
          message: this.inputText,
          author: "ME",
          payload: { text: this.inputText }
        });
      this.inputText = "";
      clearTimeout(typingTimer);
      typingTimer = null;
    },
    typingStart() {
      clearTimeout(typingTimer);
    },
    typingEnd(event) {
      if (event.key !== "Enter") {
        if (typingTimer === null) {
          console.log("Start typing");
        }
        clearTimeout(typingTimer);
        typingTimer = setTimeout(function() {
          console.log("Stopped typing");
          clearTimeout(typingTimer);
          typingTimer = null;
        }, doneTypingInterval);
      }
    }
  },

  computed: {
    ...mapGetters(["messages"])
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/main.scss";
#chat-window {
  background-color: #f2f3f8;
}
</style>
