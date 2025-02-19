import { Inngest } from "inngest";
import connectDB from "./db";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });


//----------add-----------//

export const syncUserCreation = inngest.createFunction(
    { id: 'sync-user-from-clerk' }, 
    { event: 'clerk/user-created' },
    async ({event}) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data
        // Add your logic here to sync the user to your database
        const userDeta = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' +last_name,
            imageUrl: image_url
        }

        await connectDB()
        await User.create(userDeta)
    }
)

//----------Update-----------//

export const syncUserUpdate = inngest.createFunction(
    { id: 'update-user-from-clerk' }, 
    { event: 'clerk/user-updated' },
    async ({event}) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data
        // Add your logic here to sync the user to your database
        const userDeta = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' +last_name,
            imageUrl: image_url
        }

        await connectDB()
        await User.findByIdAndUpdate(id, userDeta)
    }
)

//----------delete-----------//

export const syncUserDeletion = inngest.createFunction(
    { id: 'delete-user-from-clerk' }, 
    { event: 'clerk/user-deleted' },
    async ({event}) => {
        const {id} = event.data
        // Add your logic here to sync the user to your database
        await connectDB()
        await User.findByIdAndDelete(id)
    }
)