
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.UidView=void 0;const UE=require("ue"),ModelManager_1=require("../../Manager/ModelManager"),UiViewBase_1=require("../../Ui/Base/UiViewBase"),LguiUtil_1=require("../Util/LguiUtil");class UidView extends UiViewBase_1.UiViewBase{OnRegisterComponent(){this.ComponentRegisterInfos=[[0,UE.UIText]]}OnStart(){LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0),"FriendMyUid",ModelManager_1.ModelManager.FunctionModel.PlayerId.toString())}}exports.UidView=UidView;
//# sourceMappingURL=UidView.js.map
