<template>
    <div class="news-wrapper">
        <strong>News list:</strong>
        <div>
            <div>
                <div style=" display:flex; flex-direction:column; justify-content:center; width: 100%">
                    <b>PouchDB</b>
                    <div>
                        <strong>Add news</strong>

                        <form @submit.prevent="addInPoach">
                            <input v-model="newNewsPoach"/>
                            <button type="submit">Add in pouch</button>
                        </form>
                    </div>
                </div>
                <br>
                <div style=" display:flex; flex-direction:column; align-items:center; width: 100%">
                    <div class="news" v-for="(news, index) in newsPoach"
                         :key="news._id"
                    >
                        <div>
                            {{ index+1 }}
                        </div>
                        <div>
                            {{ news.item }}
                        </div>
                        <button @click="removeNews(news)">delete</button>
                        <button @click="editItem(news)">edit</button>
                    </div>
                    <Modal v-if="isOpenModal"
                           @edit="edit"
                           @close="isOpenModal=false"
                           :id="news._id"
                           :newsPouch="newsPoach"/>
                </div>
            </div>


        </div>
        <form @submit.prevent="createNewUser">
            <input v-model="userName"/>
            <input v-model="userPassword"/>
            <button type="submit">Create new User</button>
        </form>
    </div>

</template>
<script>
  import {mapActions} from 'vuex'
  import {GET_NEWS, ADD_NEWS, DELETE_NEWS} from '../store'
  import Modal from "../components/Modal";

  export default {
    name: "news",
    components: {Modal},
    data() {
      return {
        newNews: '',
        newNewsPoach: '',
        newsPoach: [],
        isOpenModal: false,
        news: {},
        userName: '',
        userPassword: ''
      }
    },
    pouch: {
      newsFromLocal: {}
    },
    created() {
      // this.$pouch.useAuth("admin", "123456");
      // console.log(this.$pouch.session, 'session');
      this.$pouch.sync('books', 'http://localhost:5984/books', {
        selector: {
          type: 'complaint',
          // assignee: this.session.name
        }
      });
      this.getNewsFromPouch();
      // console.log(this.$pouch.useAuth('admin', '123456'), 'session')
      // console.log(this.$pouch.loading, 'loading')
      // console.log(this.$pouch.hasAuth, 'loading')

    },
    methods: {
      ...mapActions({
        getNews: GET_NEWS,
        addNews: ADD_NEWS,
        deleteNews: DELETE_NEWS
      }),
      getNewsFromPouch() {
        this.$pouch.allDocs('books', {include_docs: true}).then(({rows}) => {
          this.newsPoach = rows.map(item => item.doc);
          this.newsPoach = this.newsPoach.sort((a, b) => a.created - b.created);

        })
      },
      removeNews(news) {
        this.$pouch.remove('books', news).then(this.getNewsFromPouch)
      },
      addInPoach() {
        this.$pouch.post('books', {item: this.newNewsPoach, created: Date.now()}).then(this.getNewsFromPouch)
        this.newNewsPoach = '';
      },
      editItem(news) {
        this.news = news;
        this.isOpenModal = true;
      },
      edit(item) {
        this.isOpenModal = false;
        this.$pouch.put('books', {...this.news, item}).then(this.getNewsFromPouch)

      },
      createNewUser() {
        this.$pouch.createUser(this.userName, this.userPassword)
      }

      // computed: {
      //   ...mapState({
      //     news: store => store.news,
      //   })
      // },

    }
  }
</script>

<style scoped>
    .news-wrapper {
        width: 100%;
        padding: 50px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .news {
        display: grid;
        min-width: 400px;
        width: 50%;
        border: 1px solid bisque;
        justify-content: center;
        grid-template-columns: 20px 1fr 60px 60px;
        grid-column-gap: 50px;
    }
</style>