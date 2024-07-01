"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionRecoveryResultView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
	ItemController_1 = require("../../../Item/ItemController"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	VisionRecoverySlotItem_1 = require("./VisionRecoverySlotItem"),
	VisionRecoverySlotPanel_1 = require("./VisionRecoverySlotPanel");
class VisionRecoveryResultView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.qpt = void 0),
			(this.Gpt = void 0),
			(this.Npt = []),
			(this.Opt = () => {
				this.CloseMe();
			}),
			(this.kpt = (e, t) => {
				void 0 !== t &&
					ItemController_1.ItemController.OpenItemTipsByItemUid(
						t.GetUniqueId(),
						t.GetConfigId(),
					);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[5, this.Opt]]);
	}
	async OnBeforeStartAsync() {
		var e = this.OpenParam;
		void 0 === e
			? Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Calabash",
					59,
					"VisionRecoveryResultView responseData为空",
				)
			: ((this.qpt = new VisionRecoverySlotPanel_1.VisionRecoverySlotPanel(
					void 0,
					!1,
				)),
				await this.qpt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
				(this.Gpt = new VisionRecoverySlotItem_1.VisionRecoverySlotItem(
					this.kpt,
					!1,
				)),
				await this.Gpt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
				this.Fpt(e.cUs),
				this.Vpt(e._gs),
				await this.Hpt(e.uUs),
				this.jpt(e.uUs));
	}
	Fpt(e) {
		(e =
			ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByPhantomItem(
				e,
			)),
			this.qpt.RefreshUi(e);
	}
	Vpt(e) {
		(e =
			ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByAddCountItemInfo(
				e,
			)).length <= 0
			? Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Calabash", 59, "VisionRecoveryResultView 主奖励为空")
			: this.Gpt.RefreshUi(e[0]);
	}
	async Hpt(e) {
		var t = this.GetItem(2);
		if (e.length <= 0) t.SetUIActive(!1);
		else {
			const i =
				ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByAddCountItemInfo(
					e,
				);
			if (i.length <= 0)
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Calabash",
						59,
						"VisionRecoveryResultView 次奖励转换失败，返回空",
					),
					t.SetUIActive(!1);
			else {
				t.SetUIActive(!0);
				const e = this.GetItem(3),
					o = this.GetItem(4),
					s = new Array();
				i.forEach(() => {
					var t = new VisionRecoverySlotItem_1.VisionRecoverySlotItem(
							this.kpt,
							!1,
						),
						i = LguiUtil_1.LguiUtil.CopyItem(o, e);
					s.push(t.CreateThenShowByActorAsync(i.GetOwner())), this.Npt.push(t);
				}),
					await Promise.all(s),
					this.Npt.forEach((e, t) => {
						e.RefreshUi(i[t]);
					}),
					o.SetUIActive(!1);
			}
		}
	}
	jpt(e) {
		e.length <= 0 ||
			this.UiViewSequence.AddSequenceFinishEvent("Start", () => {
				switch (e.length) {
					case 1:
						this.UiViewSequence.PlaySequence("RewardA");
						break;
					case 2:
						this.UiViewSequence.PlaySequence("RewardB");
						break;
					case 3:
						this.UiViewSequence.PlaySequence("RewardC");
						break;
					default:
						this.UiViewSequence.PlaySequence("RewardD");
				}
			});
	}
}
exports.VisionRecoveryResultView = VisionRecoveryResultView;
