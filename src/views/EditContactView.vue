<template>
    <div class="container">
        <div class="container mt-3">
            <div class="row">
                <div class="col-md-6">
                    <div class="h3">Edit this contact</div>
                </div>
                <p class="lead fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto
                    cum est impedit ipsa laboriosam possimus quaerat repellendus saepe totam.</p>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <form @submit.prevent="updateContact">
                    <div class="mb-2">
                        <input class="form-control" placeholder="Full name" type="text" v-model="contact.name">
                    </div>
                    <div class="mb-2">
                        <input class="form-control" placeholder="Photo url" type="text" v-model="contact.photo">
                    </div>
                    <div class="mb-2">
                        <input class="form-control" placeholder="Email address" type="email" v-model="contact.email">
                    </div>
                    <div class="mb-2">
                        <input class="form-control" placeholder="Phone number" type="tel" v-model="contact.mobile">
                    </div>
                    <div class="mb-2">
                        <input class="form-control" placeholder="Company name" type="text" v-model="contact.company">
                    </div>
                    <div class="mb-2">
                        <input class="form-control" placeholder="Title" type="text" v-model="contact.title">
                    </div>
                    <div class="mb-2">
                        <select class="form-control" v-if="groups.length>0" v-model="contact.groupId">
                            <option value="">select group</option>
                            <option :key="group.id" :value="group.id" v-for="group of groups">{{group.name}}</option>

                        </select>
                    </div>
                    <div class="g-3">
                        <input class="btn btn-success" type="submit" value="Update"/>
                    </div>
                </form>
            </div>
            <div class="col-md-4">
                <img alt="User image" class="user-image" :src="contact.photo">
            </div>
        </div>

    </div>

</template>
<script>
    import {ContactServices} from "@/services/contactServices";

    export default {
        name: "EditContactView",
        data() {
            return {
                id: this.$route.params.contactId,
                contact: {},
                groups: []
            }
        },
        async created() {
            try {
                const response = await ContactServices.getContact(this.id)
                const groups = await ContactServices.getAllGroups()
                this.contact = response.data
                this.groups = groups.data
            } catch (e) {
                console.log(e)
            }
        },
        methods: {
            async updateContact() {
                try {

                    const updatedContact = await ContactServices.updateContact(this.contact,this.id)
                    if (updatedContact){
                        return this.$router.push({name:'home'})
                    }else{
                        return this.$router.push({name:'editContact'})
                    }

                } catch (e) {
                    console.log(e)

                }
            }
        }
    }
</script>