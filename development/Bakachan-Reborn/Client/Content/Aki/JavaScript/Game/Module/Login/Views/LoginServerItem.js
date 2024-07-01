"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoginServerItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil");
class LoginServerItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.ySi = (e) => {
				this.Pe &&
					((ModelManager_1.ModelManager.LoginServerModel.CurrentUiSelectSeverData =
						this.Pe),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnSelectServerItem,
					));
			}),
			(this.ISi = () => {
				this.Oqe();
			});
	}
	GetUsingItem(e) {
		return this.GetRootItem().GetOwner();
	}
	async Init(e) {
		await super.CreateByActorAsync(e.GetOwner(), void 0, !0).finally(() => {
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSelectServerItem,
				this.ISi,
			);
		});
	}
	ClearItem() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnSelectServerItem,
			this.ISi,
		),
			this.Destroy();
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UISprite],
			[4, UE.UIItem],
			[5, UE.UIText],
			[7, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.ySi]]);
	}
	Oqe() {
		this.GetExtendToggle(0).SetToggleState(
			ModelManager_1.ModelManager.LoginServerModel.CurrentUiSelectSeverData ===
				this.Pe
				? 1
				: 0,
			!1,
		);
	}
	Update(e, t) {
		(this.Pe = e), this.GetText(1).SetText(e.name);
		var i =
			ModelManager_1.ModelManager.LoginServerModel.OnBeginSuggestServerData ===
			this.Pe;
		e =
			0 <
			(i =
				(this.GetItem(7).SetUIActive(i),
				ModelManager_1.ModelManager.LoginServerModel.GetLoginLevel(
					ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()?.Uid ?? "",
					e.Region,
				)));
		this.GetItem(4).SetUIActive(e),
			e &&
				LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "OverSeaServerLv", i),
			this.Oqe();
	}
	OnBeforeDestroy() {
		this.Pe = void 0;
	}
}
exports.LoginServerItem = LoginServerItem;
