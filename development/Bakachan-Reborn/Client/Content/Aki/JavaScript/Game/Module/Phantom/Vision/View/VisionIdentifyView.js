"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisionIdentifyView = void 0);
const UE = require("ue"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiComponentsAction_1 = require("../../../../Ui/Base/UiComponentsAction"),
	UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
	UiLayer_1 = require("../../../../Ui/UiLayer"),
	ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
	MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid"),
	NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent"),
	RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController"),
	UiSceneManager_1 = require("../../../UiComponent/UiSceneManager"),
	UiModelUtil_1 = require("../../../UiModel/UiModelUtil"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	VisionIdentifyComponent_1 = require("./VisionIdentifyComponent"),
	VisionMainAttributeComponent_1 = require("./VisionMainAttributeComponent"),
	VisionNameText_1 = require("./VisionNameText");
class VisionIdentifyView extends UiTabViewBase_1.UiTabViewBase {
	constructor() {
		super(...arguments),
			(this.b7i = void 0),
			(this.q7i = void 0),
			(this.G7i = 0),
			(this.N7i = void 0),
			(this.O7i = !1),
			(this.v8i = void 0),
			(this.k7i = new Map()),
			(this.F7i = new Array()),
			(this.V7i = () => {
				this.g0t();
			}),
			(this.H7i = (e, t) => {
				this.j7i(e, t);
			}),
			(this.W7i = () => {
				this.K7i();
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIText],
		];
	}
	async OnBeforeStartAsync() {
		(this.b7i = new VisionIdentifyComponent_1.LevelUpIdentifyComponent(
			this.GetItem(2),
		)),
			await this.b7i.Init(this.GetViewName()),
			(this.q7i =
				new VisionMainAttributeComponent_1.VisionMainAttributeComponent()),
			await this.q7i.CreateByActorAsync(this.GetItem(0).GetOwner());
	}
	OnStart() {
		(this.N7i = new VisionIdentifyCostItem(this.GetItem(1))),
			this.N7i.Init(),
			this.N7i.SetOnChangeValueCallBack(this.V7i),
			(this.v8i = new VisionNameText_1.VisionNameText(this.GetText(3)));
	}
	OnBeforeShow() {
		this.mEe(), (this.G7i = this.ExtraParams), this.K7i(), this.Og();
	}
	mEe() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnVisionIdentify,
			this.W7i,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnVisionIdentifyDoAnimation,
				this.H7i,
			),
			(this.O7i = !0);
	}
	dEe() {
		this.O7i &&
			((this.O7i = !1),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnVisionIdentify,
				this.W7i,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnVisionIdentifyDoAnimation,
				this.H7i,
			));
	}
	Og() {
		this.Q7i(), this.sbi(), this.C4e();
	}
	C4e() {
		var e =
			ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
				this.G7i,
			);
		this.v8i.Update(e);
	}
	async j7i(e, t) {
		UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", !0),
			this.X7i(),
			0 < this.F7i?.length && (await this.b7i.PlayUpdateAnimation(this.F7i));
		const i =
			ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
				e,
			);
		UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
			UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle().Model,
			"VisionChangeController",
		),
			(e =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionIdentifyDelay()),
			TimerSystem_1.TimerSystem.Delay(() => {
				var e = i.GetNewSubPropSuccessData(t);
				RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(
					e,
				),
					UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", !1);
			}, e),
			this.Og();
	}
	X7i() {
		var e, t;
		0 < this.F7i.length &&
			((e = (t =
				ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
					this.G7i,
				)).GetCurrentCanIdentifyCount()),
			0 <
				(t = t.GetSubPropIdentifyPreviewData(
					t.GetPhantomLevel(),
					0 === e ? 0 : this.N7i.CurrentConsumeSelectNum(),
				)).length) &&
			this.b7i.Update(t, !0);
	}
	K7i() {
		this.F7i = [];
		var e =
				ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
					this.G7i,
				),
			t = e.GetCurrentCanIdentifyCount(),
			i = e.GetSubPropIdentifyPreviewData(
				e.GetPhantomLevel(),
				0 === t ? 0 : this.N7i.CurrentConsumeSelectNum(),
			),
			n = i.length;
		if (0 < n)
			for (let e = 0; e < n; e++) {
				var o = this.k7i.get(e);
				(5 !== o && 1 !== o) ||
					o === i[e].SlotState ||
					3 !== i[e].SlotState ||
					this.F7i.push(e);
			}
		for (let e = 0; e < n; e++) {
			var r = i[e].SlotState;
			this.k7i.set(e, r);
		}
	}
	sbi() {
		var e =
			ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
				this.G7i,
			);
		this.N7i.Update(e);
	}
	Q7i() {
		var e = (e =
			ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
				this.G7i,
			)).GetLevelUpPreviewData(e.GetPhantomLevel());
		this.q7i.Update(e);
	}
	g0t() {
		var e,
			t = (e =
				ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
					this.G7i,
				)).GetCurrentCanIdentifyCount();
		(t =
			0 <
			(e = e.GetSubPropIdentifyPreviewData(
				e.GetPhantomLevel(),
				0 === t ? 0 : this.N7i.CurrentConsumeSelectNum(),
			)).length) && this.b7i.Update(e, !1),
			this.b7i.SetActive(t);
	}
	OnBeforeHide() {
		this.dEe(), UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", !1);
	}
	OnBeforeDestroy() {
		this.dEe(), this.b7i.Destroy(), this.q7i.Destroy(), this.N7i.Destroy();
	}
}
exports.VisionIdentifyView = VisionIdentifyView;
class VisionIdentifyCostItem extends UiComponentsAction_1.UiComponentsAction {
	constructor(e) {
		super(),
			(this.wqe = void 0),
			(this.WGe = void 0),
			(this.Pe = void 0),
			(this.$7i = void 0),
			(this.Y7i = void 0),
			(this.Jwt = void 0),
			(this.w$t = (e) => {
				this.Jwt?.SetSelected(!1, !0);
				var t = this.Pe.GetCurrentIdentifyCostId(),
					i =
						ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(
							t,
						);
				let n = 0;
				void 0 !== (n = 0 < i.length ? i[0].GetUniqueId() : n) && 0 < n
					? ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemUid(
							n,
							t,
						)
					: ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
							t,
						);
			}),
			(this.J7i = () => {
				this.z7i(this.Pe)
					? this.Pe.GetIfHaveEnoughIdentifyGold(this.CurrentConsumeSelectNum())
						? this.Z7i()
						: ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"IdentifyNotEnoughMoney",
							)
					: ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"LevelUpMaterialShort",
						);
			}),
			(this.KGe = (e) => {
				var t =
					ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
						"IdentifyCount",
					);
				return new LguiUtil_1.TableTextArgNew(t, e);
			}),
			(this.QGe = (e) => {
				this.Og(), this.Y7i?.();
			}),
			(this.wqe = e);
	}
	Init() {
		this.SetRootActor(this.wqe.GetOwner(), !0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIText],
			[6, UE.UIText],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[9, UE.UITexture],
			[10, UE.UIText],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[13, UE.UIText],
		];
	}
	OnStart() {
		(this.WGe = new NumberSelectComponent_1.NumberSelectComponent(
			this.GetItem(8),
		)),
			(this.$7i = new ButtonItem_1.ButtonItem(this.GetItem(11))),
			this.$7i.SetFunction(this.J7i),
			(this.Jwt = new MediumItemGrid_1.MediumItemGrid()),
			this.Jwt.Initialize(this.GetItem(12).GetOwner()),
			this.Jwt.BindOnExtendToggleStateChanged(this.w$t);
	}
	async Z7i() {
		UiLayer_1.UiLayer.SetShowMaskLayer("PhantomIdentify", !0),
			await ControllerHolder_1.ControllerHolder.PhantomBattleController.RequestPhantomIdentify(
				this.Pe.GetIncrId(),
				this.CurrentConsumeSelectNum(),
			),
			UiLayer_1.UiLayer.SetShowMaskLayer("PhantomIdentify", !1);
	}
	eHi() {}
	tHi(e) {
		var t,
			i = {
				Type: 4,
				ItemConfigId: (t = e.GetCurrentIdentifyCostId()),
				StarLevel:
					ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t)
						.QualityId,
			};
		e = e.GetCurrentIdentifyCostValue();
		let n = 0,
			o =
				(0 <
					(t =
						ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByConfigId(
							t,
						)).length && (n = t[0].GetCount()),
				0);
		0 < this.CurrentConsumeSelectNum() &&
			(o = e * this.CurrentConsumeSelectNum()),
			(i.BottomText =
				n >= e
					? StringUtils_1.StringUtils.Format(
							MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
								"Text_CollectProgress_Text",
							),
							n.toString(),
							o.toString(),
						)
					: StringUtils_1.StringUtils.Format(
							MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
								"Text_ItemCostNotEnough_Text",
							),
							n.toString(),
							o.toString(),
						)),
			this.Jwt.Apply(i);
	}
	iHi(e) {
		var t = {
			MaxNumber: (e = e.GetCurrentCanIdentifyCount()),
			GetExchangeTableText: this.KGe,
			ValueChangeFunction: this.QGe,
		};
		this.WGe.SetMinValue(0),
			this.WGe.Init(t),
			this.WGe.SetAddReduceButtonActive(!0),
			this.WGe.SetMinTextShowState(!0),
			this.WGe.SetAddReduceButtonInteractive(1 < e),
			this.WGe.SetReduceButtonInteractive(1 < this.CurrentConsumeSelectNum());
	}
	oHi(e) {
		var t = e.GetIdentifyCostItemId();
		(t = (this.SetItemIcon(this.GetTexture(9), t), this.GetText(10))).SetText(
			(
				e.GetIdentifyCostItemValue() * this.CurrentConsumeSelectNum()
			).toString(),
		),
			t.SetChangeColor(
				!e.GetIfHaveEnoughIdentifyGold(this.CurrentConsumeSelectNum()),
				t.changeColor,
			);
	}
	rHi(e) {
		(e = this.nHi(e)), this.GetItem(3).SetUIActive(e);
	}
	nHi(e) {
		let t = !0;
		for (const i of e.GetLevelSubPropData(e.GetPhantomLevel()))
			if (3 !== i.SlotState) {
				t = !1;
				break;
			}
		return t;
	}
	H5e(e) {
		var t = this.sHi(e);
		this.GetItem(4).SetUIActive(t),
			t &&
				(e.GetIfHaveEnoughIdentifyConsumeItem(this.CurrentConsumeSelectNum())
					? LguiUtil_1.LguiUtil.SetLocalText(
							this.GetText(5),
							"IdentifyNeedLevelText",
							e.GetNextIdentifyLevel(),
						)
					: this.GetText(5).SetText(
							MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
								"IdentifyNotEnough",
							),
						));
	}
	z7i(e) {
		return e.GetIfHaveEnoughIdentifyConsumeItem(this.CurrentConsumeSelectNum());
	}
	sHi(e) {
		var t = e.GetIfHaveEnoughIdentifyConsumeItem(
				this.CurrentConsumeSelectNum(),
			),
			i = e.GetIfHaveUnIdentifySubProp();
		return !(this.nHi(e) || (i && t));
	}
	aHi(e) {
		var t = this.nHi(e),
			i = this.sHi(e),
			n = t || i;
		this.GetItem(7).SetUIActive(!n),
			this.GetItem(11).SetUIActive(!n),
			i &&
				((n = e.GetIfHaveEnoughIdentifyConsumeItem(
					this.CurrentConsumeSelectNum(),
				)),
				this.GetItem(2).SetUIActive(!n)),
			t && this.GetItem(2).SetUIActive(!1),
			i || t || this.GetItem(2).SetUIActive(!0);
	}
	CurrentConsumeSelectNum() {
		return this.WGe.GetSelectNumber();
	}
	Update(e) {
		(this.Pe = e), this.iHi(this.Pe), this.Og();
	}
	SetOnChangeValueCallBack(e) {
		this.Y7i = e;
	}
	hHi(e) {
		e.GetIfHaveEnoughIdentifyConsumeItem(this.CurrentConsumeSelectNum()) ||
			1 !== this.CurrentConsumeSelectNum() ||
			((e =
				ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
					"IdentifyCount",
				)),
			(e = StringUtils_1.StringUtils.Format(
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e),
				"0",
			)),
			this.WGe.SetNumberSelectTipsText(e));
	}
	Og() {
		this.oHi(this.Pe),
			this.H5e(this.Pe),
			this.rHi(this.Pe),
			this.aHi(this.Pe),
			this.tHi(this.Pe),
			this.eHi(),
			this.hHi(this.Pe);
	}
}
