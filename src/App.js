import React, { Component } from 'react';
import './App.css';
import { useEffect, useRef, useState } from "react";

function App() {
  const mobile = useRef(window.innerWidth).current <= 640
  var [step, setStep] = useState(1)

  function Menu_item(props) {
    return(
      <div className="flex items-center gap-6 text-base text-white">
        <div className={"rounded-full font-bold w-12 h-12 max-sm:w-8 max-sm:h-8 max-sm:leading-[28px] max-sm:text-[12px] leading-[44px] text-[20px] text-center " + (props.focus ? 'text-black bg-[#bfe2fd] border-[1px] border-[#bfe2fd]' : 'border-[1px] border-[#ffffff]')}>{props.nr}</div>
        {!mobile &&
        <div>
          <div className="font-thin text-[#9699ab] text-[18px] pb-[6px]">STEP {props.nr}</div>
          <div className="font-bold tracking-[0.125rem] text-[20px]">{props.name}</div>
        </div>
        }
      </div>
    )
  }

  function Input(props) {
    return (
    <>
      <label htmlFor={props.name} className='text-[#02295a] mb-2 text-[20px] max-sm:text-[12px] font-medium'>{props.label}</label>
      <input className="w-[650px] max-sm:w-full h-[68px] max-sm:text-base max-sm:h-[42px] max-sm:rounded-md text-[24px] mb-8 max-sm:mb-3 rounded-[10px] pl-4 text-[#02295a] focus:outline-none border-[1px] border-[#d6d9e6] focus:border-[#02295a]" type={props.type} name={props.name} id={props.name} placeholder={props.placeholder} />
    </>
    )
  }
  
  const [choice, setChoice] = useState([])
  function Radio(props) {
    return (
      <div onClick={() => setChoice([props.id, props.price])} className={"sm:w-[31%] sm:h-[240px] max-sm:items-center pt-4 pb-4 sm:pt-7 sm:pb-6 hover:border-[#473dff] pl-5 max-sm:gap-3 sm:flex-col border-[1px] border-[#d6d9e6] rounded-xl flex " + (choice[0]===props.id && 'bg-[#fafbff] border-[#473dff] ')}>
        <img src={"/Multi-step_form/images/icon-" + props.id + ".svg"} className={'w-[40px] h-[40px] mb-auto sm:w-[60px] sm:h-[60px] '} alt="plan img" />
        <div className="flex flex-col">
          <h2 className="first-letter:uppercase text-base sm:text-[24px] text-[#02295a] font-bold">{props.id}</h2>
          <div className="text-[14px] sm:text-[22px] text-[#9699ab]">${(checked ? props.price*10 : props.price) + '/' + (checked ? 'yr' : 'mo')}</div>
          {checked ? <div className="text-[#02295a] text-base">2 months free</div> : <></>}
        </div>
      </div>
    )
  }

  const [checked, setChecked] = useState(false)
  function CheckBox() {
    return (
      <div className="mt-6 sm:mt-1">
        <div className="h-[64px] bg-[#fafbff] sm:text-[20px] font-bold flex justify-center items-center gap-8 rounded-lg">
          <div className={!checked ? 'text-[#02295a]' : 'text-[#9699ab]'}>Monthly</div>
          <div onClick={() => {setChecked(!checked)}} className="bg-[#02295a] w-[58px] my-auto rounded-full">
            <div className={"rounded-full checked:ml-auto bg-white w-[18px] h-[18px] m-[6px] " + (checked && 'ml-auto')}></div>
          </div>
          <div className={checked ? 'text-[#02295a]' : 'text-[#9699ab]'}>Yearly</div>
        </div>
      </div>
    )
  }

  const [addOns, setAddOns] = useState([[false, 1], [false, 2], [false, 2]])
  function CheckBox2(props) {
    return (
      <div className="flex sm:w-[650px] sm:gap-9 hover:border-[#473dff] items-center border-[1px] border-[#d6d9e6] rounded-xl max-sm:rounded-lg py-3 px-5 sm:py-6 sm:px-9">{/*maybe paddingX and gap sholud be 8*/}
        <button onClick={() =>{
          const a = addOns
          a[props.index][0] = !a[props.index][0]
          setAddOns(a)
        }} className={"w-5 h-5 sm:w-7 sm:h-7 br-[#473dff] border-[1px] border-[#d6d9e6] rounded-md max-sm:rounded-[4px] " + (addOns[props.index][0]===true && 'bg-[#473dff]')}></button>
        <div className="flex flex-col ml-5 mr-auto">
          <h2 className="first-letter:uppercase text-[14px] sm:text-[24px] text-[#02295a] font-bold">{props.name}</h2>
          <div className="text-[10px] sm:text-[18px] text-[#9699ab]">{props.description}</div>
        </div>
        <div className="text-[14px] sm:text-[22px] text-[#473dff]">${!checked ? props.price+'/mo' : (props.price*10)+'/yr'}</div>
      </div>
    )
  }

  function FormTop(props) {
    return (
      <>
        <h1 className="text-[3rem] max-sm:text-[1.5rem] font-bold text-[#02295a] pb-2">{props.name}</h1>
        <p className="text-[24px] text-[#9699ab] max-sm:text-base sm:mb-[50px] max-sm:pb-5">{props.text}</p>
      </>
    )
  }

  function PesronalInfo() {
    return (
      <>
      <FormTop name='Personal info' text='Please provide your name, email adress and phone number.' />
        <Input type="text" name="name" label="Name" placeholder="e.g. Stephen King" />
        <Input type="email" name="email" label="Email Adress" placeholder="e.g. stephenking@lorem.com" />
        <Input type="tel" label="Phone Number"  placeholder="e.g. +1 234 567 890" />
      </>
    );
  }
  function SelectPlan() {
    return (
      <>
        <FormTop name='Select your plan' text='You have the option of monthly or yearly billing.' />
        <div className="flex justify-between gap-3 max-sm:flex-col sm:w-[650px] sm:mb-[35px]">
          <Radio id='arcade' price={9} />
          <Radio id='advanced' price={12} />
          <Radio id='pro' price={15} />
        </div>
        <CheckBox />
        {mobile && <div className="h-[12px]"></div>}
      </>
    );
  }
  function AddOns() {
    return (
      <>
        <FormTop name='Pick add-ons' text='Add-ons help enhange your gaming experience.' />
        <div className="flex flex-col gap-5">
          <CheckBox2 name='Online service' description='Acces to multiplayer games' price={1} index={0} />
          <CheckBox2 name='Larger storage' description='Extra 1TB of cloud save' price={2} index={1} />
          <CheckBox2 name='Customizable profile' description='Custom theme on your profile' price={2} index={2} />
        </div>
      </>
    );
  }
  var addOnsPriceTot = 0
  function Summary() {
    var a = []
    function MiniAddOn(props) {
      return (
      <div className="flex justify-between">
        <div className="text-[10px] sm:text-[18px] text-[#9699ab]">{addOns[props.index][1]===0 && 'Larger storage'}{addOns[props.index][1]===0 && 'Online service'}{addOns[props.index][1]===2 && 'Customizable profile'}</div>
        <div className="text-[14px] sm:text-[22px] text-[#9699ab]">+${!checked ? addOns[props.index][1]+'/mo' : (addOns[props.index][1]*10)+'/yr'}</div>
      </div>
      )
    }
    for(var i = 0; i < addOns.length; i++) {
      if(addOns[i][0]){
        addOnsPriceTot+= addOns[i][1]
        a.push(i)
      }
    }
    const ax=a.map(oneA => <MiniAddOn index={oneA} key={oneA} />)
    return (
      <>
        <FormTop name='Finishing up' text='Double-check everything looks OK before confirming.' />
        <div className="sm:mt-1 sm:w-[650px]">
          <div className="bg-[#fafbff] p-5 sm:text-[20px] font-bold flex justify-center gap-8 flex-col rounded-lg">
            <div className="flex justify-between">
              <div>
                <h2 className="text-[14px] sm:text-[24px] text-[#02295a] font-bold first-letter:uppercase">{choice[0]}</h2>
                <div className="text-[10px] sm:text-[18px] underline hover:text-[#473dff] text-[#9699ab]">Change</div>
              </div>
              <div className="text-[14px] sm:text-[22px] text-[#02295a]">${!checked ? choice[1]+'/mo' : (choice[1]*10)+'/yr'}</div>
            </div>
            {a.length !== 0 && <div className="h-px bg-[#D6D9E6]"></div>}
            {ax}
          </div>
        </div>
        <div className="flex justify-between items-center mx-5 mt-6">
          <div className="text-[10px] sm:text-[18px] text-[#9699ab]">Total (per {!checked ? 'month' : 'year'})</div>
          <div className="text-[16px] font-bold sm:text-[26px] text-[#473dff]">+${!checked ? (choice[1] + addOnsPriceTot)+'/mo' : ((choice[1]+addOnsPriceTot)*10)+'/yr'}</div>
        </div>
      </>        
    );
  }

  function NextBtn() {
    return (
        <div className="flex items-center mt-auto max-sm:absolute max-sm:bottom-0 max-sm:w-screen max-sm:p-5 max-sm:bg-white">
          {step > 1 && <button className="text-base text-[#9699ab] font-bold" onClick={() => {setStep(step--)}}>Go Back</button>}
          <button onClick={() => {setStep(step++)}} className={'text-white px-8 py-4 max-sm:py-[10px] max-sm:px-4 max-sm:rounded-[4px] max-sm:text-base rounded-[10px] text-[22px] font-bold ml-auto ' + (step === 4 ? 'bg-[#473dff]' : 'bg-[#02295a] focus:bg-[#]')}>{step === 4 ? 'Confirm' : 'Next Step'}</button>
        </div>
    );
  }

  function refresh() {
    switch(step) {
      case 1: return <PesronalInfo />; break;
      case 2: return <SelectPlan />; break;
      case 3: return <AddOns />; break;
      case 4: return <Summary />; break;
      case 5: return <>thank you</>;break;
    }
  }



    return (
      <div className="code bg-[#f0f6ff] ubuntu flex min-h-[calc(100vh-84px)] sm:min-h-screen justify-center items-center max-sm:items-start">
        <div className="bg-white p-6 rounded-3xl gap-[9rem] max-sm:gap-0 flex pr-[9rem] max-sm:flex-col max-sm:bg-transparent max-sm:p-0">
        <div className="max-sm:w-screen2">
          <div className="absolute flex gap-11 max-sm:gap-[0.9rem] max-sm:justify-center pt-14 pl-12 z-20 flex-col bg-transparent max-sm:flex-row max-sm:mx-auto max-sm:px-0 max-sm:w-screen max-sm:pt-10">
            <Menu_item nr={1} name='YOUR INFO' focus={step===1} />
            <Menu_item nr={2} name='SELECT PLAN' focus={step===2} />
            <Menu_item nr={3} name='ADD-ONS' focus={step===3} />
            <Menu_item nr={4} name='SUMMARY' focus={step===4 || step===5} />
          </div>
          <img className="z-10 sm:h-[852px]  max-sm:w-screen" src={"/Multi-step_form/images/bg-sidebar-" + (mobile ? 'mobile' : 'desktop') + ".svg"} alt="sidebar background" />
        </div>
        <div className="flex flex-col sm:h-[852px] pb-5 pt-14 max-sm:pt-8 max-sm:bg-white max-sm:rounded-xl max-sm:pb-6 max-sm:mx-5 max-sm:px-6 max-sm:-translate-y-[4rem]">
        {refresh()}
        {!mobile && <NextBtn />}
        </div>
        {mobile && <NextBtn />}
        </div>
      </div>
    );
  }
  
  export default App;
  
