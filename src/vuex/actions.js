import API from '../api/index'

export const addNews = ({ commit }, news) => {
  commit('ADD_NEWS', news)
}

// 获取当天新闻
export const getNews = ({ commit }) => {
  API.NewsResource().then(res => {
    if (res.ok) {
      commit('UPDATE_NEWS', res.data)
    }
  })
}

// 主题日报缓存
export const getTopics = ({ commit }) => {
  API.TopicsResource().then(res => {
    if (res.ok) {
      let topics = res.data
      commit('ADD_TOPICS', topics.others)
    }
  })
}

// 栏目总览缓存
export const getSections = ({ commit }) => {
  API.SectionsResource().then(res => {
    if (res.ok) {
      let sections = res.data
      commit('ADD_SECTIONS', sections.data)
    }
  })
}

// 获取文章
export const getPost = ({ commit, state }, id, fun) => {
  let post = state.posts.find(p => p.id.toString() === id)

  if (!post) {
    API.NewsIdResource(id).then(res => {
      post = res.data
      return API.NewsInfoResource(id)
    }).then(res2 => {
      if (res2.ok) {
        let info = res2.data
        // 将post info属性赋值给post
        for (let item in info) {
          if ({}.hasOwnProperty.call(info, item)) {
            post[item] = info[item]
          }
        }
        commit('ADD_POSTS', post)
        if (typeof fun === 'function') {
          fun()
        }
      }
    })
  }
}

// 获取主题日报文章
export const getTopicPosts = ({ commit }, id) => {
  API.TopicIdResource(id).then(res => {
    if (res.ok) {
      let posts = res.data
      commit('ADD_TOPICPOSTS', posts)
    }
  })
}

// 获取栏目文章
export const getSectionList = ({ commit }, id) => {
  API.SectionIdResource(id).then(res => {
    if (res.ok) {
      let list = res.data
      commit('ADD_SECTIONLIST', list)
    }
  })
}

// 数据过渡状态
export const updateLoading = ({ commit }, lodaing) => {
  commit('UPDATE_LOADING', lodaing)
}

export const addIndex = ({ commit }) => {
  commit('ADD_INDEX')
}
