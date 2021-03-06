import React from 'react';
import { Tabs , Tag } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import { Button , Divider, TextField} from '@mui/material'

const TabsProfile = ({connectedUserId , profileId , User}) => {
    const { TabPane } = Tabs;

    const renderTabBar = (props, DefaultTabBar) => (
        <Sticky bottomOffset={80}>
          {({ style }) => (
            <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
          )}
        </Sticky>
      );

  return (
    <StickyContainer style={{width:'100%'}}>
    <Tabs centered defaultActiveKey="1" renderTabBar={renderTabBar}>
        <TabPane tab="Overview" key="1"  style={{ padding:'33px'}}>
            <div style={{width:'100%'}} className='UserProfile__container__main__bottom__tabs'>
            <h2>Bio</h2>
            <p> {User?.result?.bio ? User?.result?.bio : 'No bio is set'}</p>
            </div>
            <br />
            <Divider/>
            <div className='UserProfile__container__main__bottom__tabs-interests'>
                <h2>Interests</h2>
                <div className='UserProfile__container__main__bottom__tabs-interests__tags'>
                    <Tag color="blue">Sports</Tag>
                    <Tag color="blue">Gaming</Tag>
                    <Tag color="blue">Web Developement</Tag>
                    <Tag color="blue">Women</Tag>
                    <Tag color="blue">Hiking</Tag>
                    <Tag color="blue">Reading</Tag>
                </div>    

            </div>
            {connectedUserId !== profileId && (
                <> 
            <Divider/>
            <div className='UserProfile__container__main__bottom__tabs-feedback'>
            <h2>Send anonymous feedback (Beta)</h2>
            
            <TextField multiline minRows={1} autoComplete='false' placeholder='Try to write something positive' label='Feedback'></TextField>
            
            <div style={{position:'relative', right:'0px',display:'flex',width:'100%',alignItems:'center',justifyContent:'flex-end',marginTop:'10px'}}>
            <Button variant='contained' size='small' color='primary'>Send feedback</Button>
            </div>
            </div>
            </>)}
           
        </TabPane>
        <TabPane tab="Groups" key="2" style={{ padding:'33px' }}>
            Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Pages" key="3" style={{ padding:'33px' }}>
            Content of Tab Pane 3
        </TabPane>
        <TabPane tab="Posts" key="4" style={{ padding:'33px' }}>
            Content of Tab Pane 4
        </TabPane>
        <TabPane tab="Stories" key="9" style={{ padding:'33px' }}>
            Content of Tab Pane 2
        </TabPane>
       
        <TabPane tab="Events" key="5" style={{ padding:'33px' }}>
            Content of Tab Pane 5
        </TabPane>
        <TabPane tab="Activities" key="6" style={{ padding:'33px' }}>
            Content of Tab Pane 6
        </TabPane>
        <TabPane tab="More" key="7" style={{ padding:'33px' }}>
            Content of Tab Pane 7
        </TabPane>
    </Tabs>
</StickyContainer>
  )
}

export default TabsProfile