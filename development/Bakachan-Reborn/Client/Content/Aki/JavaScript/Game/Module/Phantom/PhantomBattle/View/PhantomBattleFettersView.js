"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomBattleFettersView = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
	PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	PhantomBattleFettersViewItem_1 = require("./PhantomBattleFettersViewItem");
class PhantomBattleFettersView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Rpt = void 0),
			(this.nVt = void 0),
			(this.ZVi = () => {
				ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectFetterGroupId =
					this.Rpt.GetCurrentSelectGroupId();
				var e = UiManager_1.UiManager.GetViewByName("VisionEquipmentView");
				e
					? (UiManager_1.UiManager.CloseView(this.Info.Name),
						e.SetActive(!0),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.VisionFilterMonster,
						))
					: ((e =
							ModelManager_1.ModelManager.RoleModel.GetBattleTeamFirstRoleId()),
						UiManager_1.UiManager.CloseAndOpenView(
							this.Info.Name,
							"VisionEquipmentView",
							e,
						));
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	async OnBeforeStartAsync() {
		(this.Rpt =
			new PhantomBattleFettersViewItem_1.PhantomBattleFettersViewItem()),
			(this.Rpt.OnFastFilter = this.ZVi),
			await this.Rpt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
			(this.nVt = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
			this.nVt.SetCloseCallBack(() => {
				this.CloseMe();
			});
	}
	OnBeforeShow() {
		var e = this.OpenParam;
		0 < e && this.Rpt.SelectByFetterId(e);
	}
	async OnPlayingStartSequenceAsync() {
		await this.Rpt?.PlayStartSequence();
	}
	async OnPlayingCloseSequenceAsync() {
		await this.Rpt?.PlayHideSequence();
	}
}
exports.PhantomBattleFettersView = PhantomBattleFettersView;
