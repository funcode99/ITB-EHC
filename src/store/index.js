import { createStore } from 'vuex'
import Api from '@/utils/Api'

export default createStore({
  state: {
    isLoading: false,
    isLoadingLeadsLists: true,
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
    endDate: new Date(),
    startDateChat: new Date(new Date().setDate(new Date().getDate() - 7)),
    endDateChat: new Date(),
    tagsCancel: [],
    tagsNcsat: [],
    handleByLists: [],
    leadsLists: [],
    checkedFilterStatus: [],
    checkedFilterCluster: [],
    checkedFilterHandleBy: [],
    checkedFilterTags: [],
    canFilterHandleBy: false,
    searchLeads: null,
    activeFilterTab: 0
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    isLoadingLeadsLists (state) {
      return state.isLoadingLeadsLists
    },
    startDate (state) {
      return state.startDate
    },
    endDate (state) {
      return state.endDate
    },
    startDateChat (state) {
      return state.startDateChat
    },
    endDateChat (state) {
      return state.endDateChat
    },
    tagsCancel (state) {
      return state.tagsCancel
    },
    tagsNcsat (state) {
      return state.tagsNcsat
    },
    handleByLists (state) {
      return state.handleByLists
    },
    leadsLists (state) {
      return state.leadsLists
    },
    checkedFilterStatus (state) {
      return state.checkedFilterStatus
    },
    checkedFilterCluster (state) {
      return state.checkedFilterCluster
    },
    checkedFilterHandleBy (state) {
      return state.checkedFilterHandleBy
    },
    checkedFilterTags (state) {
      return state.checkedFilterTags
    },
    canFilterHandleBy (state) {
      return state.canFilterHandleBy
    },
    searchLeads (state) {
      return state.searchLeads
    },
    activeFilterTab (state) {
      return state.activeFilterTab
    }
  },
  mutations: {
    isLoading (state, newIsLoading) {
      state.isLoading = newIsLoading
    },
    isLoadingLeadsLists (state, newIsLoadingLeadsLists) {
      state.isLoadingLeadsLists = newIsLoadingLeadsLists
    },
    startDate (state, value) {
      state.startDate = value
    },
    endDate (state, value) {
      state.endDate = value
    },
    startDateChat (state, value) {
      state.startDateChat = value
    },
    endDateChat (state, value) {
      state.endDateChat = value
    },
    tagsCancel (state, value) {
      state.tagsCancel = value
    },
    tagsNcsat (state, value) {
      state.tagsNcsat = value
    },
    handleByLists (state, value) {
      state.handleByLists = value
    },
    leadsLists (state, value) {
      state.leadsLists = value
    },
    appendLeadsLists (state, value) {
      state.leadsLists = [...state.leadsLists, ...value]
    },
    checkedFilterStatus (state, value) {
      state.checkedFilterStatus = value
    },
    checkedFilterCluster (state, value) {
      state.checkedFilterCluster = value
    },
    checkedFilterTags (state, value) {
      state.checkedFilterTags = value
    },
    checkedFilterHandleBy (state, value) {
      state.checkedFilterHandleBy = value
    },
    canFilterHandleBy (state, value) {
      state.canFilterHandleBy = value
    },
    searchLeads (state, value) {
      state.searchLeads = value
    },
    activeFilterTab (state, value) {
      state.activeFilterTab = value
    }
  },
  actions: {
    async updateTagLeads ({commit, state}, params) {
      await Api.put('/leads/update-tag', params)
    },
    async updateFollowup ({}, params) {
      await Api.put('/leads/update-welcome-followup', params)
    },
    async updateReferral ({}, params) {
      await Api.put('/leads/verify-leads-refferal', params)
    },
    async updateHandleBy ({}, params) {
      const data = await Api.put('/leads/change-handle-by', params)
    }
  },
  modules: {
  }
})
