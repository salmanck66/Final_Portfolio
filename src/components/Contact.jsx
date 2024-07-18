import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            // Simulate API call or any async action
            // Example: const response = await fetch('https://your-api-endpoint', { method: 'POST', body: JSON.stringify(data) });
            
            // Show success message
            toast.success('Message sent successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Reset form fields
            reset();
        } catch (error) {
            // Show error message if API call fails
            toast.error('Failed to send message. Please try again later.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className='px-6 max-w-[1000px] mx-auto grid md:grid-cols-2 place-items-center' id="contact">
            <div>
                <div className="p-2">
                    <div className="text-gray-300 my-3">
                        <h3 className="text-4xl font-semibold mb-5">About <span>Me</span></h3>
                        <p className="text-justify leading-7 w-11/12 mx-auto">
                            Hello! I'm Salmanul Faris CK,
                            A Full Stack Web Developer specializing in the MERN stack, Proficient in ReactJs and NodeJS, with a strong problemsolving mindset and a collaborative approach. Quick to adapt to new technologies, making me a valuable asset in dynamic web development environments.
                        </p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-6xl p-5 md:p-12' id="form">
                <p className='text-gray-100 font-bold text-xl mb-2'>Let´s connect!</p>
                <input
                    type="text"
                    id="name"
                    placeholder='Your Name ...'
                    {...register("name", { required: true })}
                    className={`mb-2 w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-400'} py-2 pl-2 pr-4`}
                />
                {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
                <input
                    type="email"
                    id="email"
                    placeholder='Your Email ...'
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    className={`mb-2 w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-400'} py-2 pl-2 pr-4`}
                />
                {errors.email && <span className="text-red-500 text-sm">Valid email is required</span>}
                <textarea
                    name="textarea"
                    id="textarea"
                    cols="30"
                    rows="4"
                    placeholder='Your Message ...'
                    {...register("message", { required: true })}
                    className={`mb-2 w-full rounded-md border ${errors.message ? 'border-red-500' : 'border-gray-400'} py-2 pl-2 pr-4`}
                />
                {errors.message && <span className="text-red-500 text-sm">Message is required</span>}
                <button type="submit" className='w-full py-3 rounded-md text-gray-100 font-semibold text-xl bg-primary-color'>Send Message</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Contact;
