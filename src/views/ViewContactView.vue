<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-6">
                <div class="h3">View contact</div>
            </div>
            <p class="lead fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto cum
                est impedit ipsa laboriosam possimus quaerat repellendus saepe totam.</p>
        </div>
    </div>
    <!--    spinner-->
    <div class="container" v-if="loading">
        <div class="row">
            <div class="col">
               <spinner-component/>
            </div>
        </div>
    </div>
    <!--    error message-->
    <div class="container mt-5" v-if="!loading&&errorMessages">
        <div class="row">
            <div class="col">
                <p class="lead display-1 text-danger text-center">{{errorMessages}}</p>
            </div>
        </div>
    </div>

    <div class="container mt-3">
        <div class="row align-items-center">
            <div class="col-md-4 ">
                <img alt="User image" :src="contact.photo" style="width: 200px;border-radius: 50%">
            </div>
            <div class="col-md-6">
                <ul class="list-group ">
                    <li class="list-group-item">Full name: <span class="fw-bold user-details align-items-end">{{contact.name}}</span></li>
                    <li class="list-group-item">Phone number: <span class="fw-bold user-details">{{contact.mobile}}</span></li>
                    <li class="list-group-item">Email address: <span class="fw-bold user-details">{{contact.email}}</span>
                    </li>
                    <li class="list-group-item">Company name: <span
                            class="fw-bold user-details">{{contact.company}}</span></li>
                    <li class="list-group-item">Title: <span class="fw-bold user-details">{{contact.title}}</span></li>
                    <li class="list-group-item">Group: <span class="fw-bold user-details">{{group.name}}</span></li>
                </ul>
            </div>
        </div>
        <div>
            <router-link :to="{name:'home'}" class="btn btn-sm btn-info">
                <i class="fa fa-circle-arrow-left"></i>Back
            </router-link>
        </div>

    </div>

</template>
<script>
    import {ContactServices} from "@/services/contactServices";
    import SpinnerComponent from "@/components/SpinnerComponent";

    export default {
        name: 'ViewContact',
        components: {SpinnerComponent},
        data() {
            return {
                loading: false,
                contact_id: this.$route.params.contactId,
                contact: {},
                errorMessages: null,
                group:{}
            }
        },
        async created() {
            try {
                this.loading = true
                const response = await ContactServices.getContact(this.contact_id)
                const groupResult = await ContactServices.getGroup(response.data)
                this.contact = response.data
                this.group = groupResult.data
                this.loading = false
            } catch (e) {
                this.errorMessages = e
                this.loading = false
            }

        }
    }
</script>