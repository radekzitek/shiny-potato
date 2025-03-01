<template>
  <MDBNavbar
    expand="lg"
    light
    bg="light"
    container
    class="border-bottom mb-4"
  >
    <MDBNavbarBrand href="#">
      Carnival
    </MDBNavbarBrand>
    <MDBNavbarToggler
      target="#navbarSupportedContent"
      @click="collapse1 = !collapse1"
    />
    <MDBCollapse
      id="navbarSupportedContent"
      v-model="collapse1"
    >
      <MDBNavbarNav class="mb-2 mb-lg-0">
        <MDBNavbarItem>
          <router-link
            to="/"
            class="nav-link"
          >
            Home
          </router-link>
        </MDBNavbarItem>

        <MDBNavbarItem>
          <router-link
            to="/about"
            class="nav-link"
          >
            About
          </router-link>
        </MDBNavbarItem>
        <MDBNavbarItem>
          <!-- Navbar dropdown -->
          <MDBDropdown
            v-model="dropdown1"
            class="nav-item"
          >
            <MDBDropdownToggle
              tag="a"
              class="nav-link"
              @click="dropdown1 = !dropdown1"
            >
              {{ authStore.user ? authStore.user.first_name + ' ' + authStore.user.last_name: 'Sign-in' }}
            </MDBDropdownToggle>
            <MDBDropdownMenu aria-labelledby="dropdownMenuButton">
              <MDBDropdownItem 
                v-if="!authStore.isAuthenticated"
                href="#"
                @click="authStore.login"
              >
                Login
              </MDBDropdownItem>
              <MDBDropdownItem 
                v-if="authStore.isAuthenticated"
                href="#"
                @click="authStore.logout"
              >
                Logout
              </MDBDropdownItem>
              <MDBDropdownItem 
                v-if="authStore.isAuthenticated"
              >
                <router-link
                  to="/profile"
                  class="dropdown-item"
                >
                  Profile
                </router-link>
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavbarItem>
      </MDBNavbarNav>
      <!-- Search form -->
      <form class="d-flex input-group w-auto">
        <input
          type="search"
          class="form-control"
          placeholder="Type query"
          aria-label="Search"
        >
        <MDBBtn outline="primary">
          Search
        </MDBBtn>
      </form>
    </MDBCollapse>
  </MDBNavbar>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import {
  MDBBtn,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-vue-ui-kit";

const authStore = useAuthStore();
const collapse1 = ref(false);
const dropdown1 = ref(false);
</script>

<style scoped></style>
