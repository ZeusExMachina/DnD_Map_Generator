import {View} from "react-native";
import React from "react";
import {Typography} from "@material-ui/core";
import ThemeSelect from "../components/ThemeSelect";
import CodeInput from "../components/CodeInput";
import SmallMenuButton from "../components/SmallMenuButton";
import SmallBackButton from "../components/SmallBackButton";


const DmOptions = () => {

    let code : string = "";

    function handleCodeChange(newcode : string){
        code = newcode;
    }

    return (
        <View>
            <div className={"backgroundImage"} >
                <div className={"dmOptionBox"} >
                    <Typography variant={"h2"} className={"dmTitle"}>
                        Dungeon Master Options
                    </Typography>
                    <div className={"dmOptionLeft"}>
                        <Typography variant={"h4"} className={"dmSubtitle"}>
                            Load Exisiting Game
                        </Typography>
                        <CodeInput defaultText={""} labelText={"Enter a Game Code Here"} onCodeChange={handleCodeChange} />
                        <div className={"loadGameButtons"}>
                            <SmallBackButton buttonString={"Back"} buttonRoute={""} />
                            <SmallMenuButton buttonString={"Load Game"} buttonRoute={"/dm"} code={code}/>
                        </div>
                    </div>
                    <div className={"dmOptionRight"}>
                        <Typography variant={"h4"} className={"dmSubtitle"}>
                            New Game
                        </Typography>
                        <ThemeSelect themeList={["Caves","Dungeon","Underground Mansion"]} />
                        <div className={"createButton"}>
                            <SmallMenuButton buttonString={"Create"} buttonRoute={"/dm"} code={code}/>
                        </div>
                    </div>
                </div>
            </div>
        </View>
    );
}
export default DmOptions
