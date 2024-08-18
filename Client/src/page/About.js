import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout titele={'About us-Ecomerc '}>
        <div className='row contactus'>
            <div className='col-md6'>
                <img 
                src='https://media.istockphoto.com/id/1441416721/photo/male-radio-presenters-having-a-great-time-in-a-studio.jpg?s=2048x2048&w=is&k=20&c=TBwyA5UNTMHmo79aJpb0bo_voGOztY6AXhn7FP7EAk4='
                alt='contactus'
                style={{width: '50%'}}
                />
            </div>
            <div className='col-md-4' >
                <p className='text-justify mt-2'> 
                Lorem ipsum dolor text is a dummy text used by graphic artists and the typesetting industry for years1. It is not gibberish; 
                it started life as an actual translation of classical Latin literature. The distribution of letters and word lengths of the 
                pseudo-Latin text roughly corresponds to natural Latin language2. Since then, it has been copied over and over again, 
                scrambled and reposted on the internet, sometimes with humorous or off-color alterations1.
                </p>
            </div>


        </div>
    </Layout>
  )
}

export default About