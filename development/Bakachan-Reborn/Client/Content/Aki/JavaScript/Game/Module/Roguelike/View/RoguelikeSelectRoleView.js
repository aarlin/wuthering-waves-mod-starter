"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeSelectRoleData =
		exports.RoguelikeSelectRoleBaseGrid =
		exports.RoguelikeSelectRoleGrid =
		exports.RoguelikeSelectRoleView =
			void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	HelpController_1 = require("../../Help/HelpController"),
	InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
	RoleController_1 = require("../../RoleUi/RoleController"),
	RoleDefine_1 = require("../../RoleUi/RoleDefine"),
	RoleSelectionMediumItemGrid_1 = require("../../RoleUi/View/RoleSelectionMediumItemGrid"),
	RoleInstance_1 = require("../../RoleUi/View/ViewData/RoleInstance"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	DynScrollView_1 = require("../../Util/ScrollView/DynScrollView"),
	RoguelikeDefine_1 = require("../Define/RoguelikeDefine"),
	RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeSelectRoleView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.DynamicScrollViewComponent = void 0),
			(this.eho = void 0),
			(this.tho = []),
			(this.ShowRoleList = []),
			(this.wLn = []),
			(this.NUe = 0),
			(this.BLn = void 0),
			(this.Q6s = 1),
			(this.w5i = void 0),
			(this.iho = void 0),
			(this.Bqe = (e, t, o) => (
				(e = new RoguelikeSelectRoleGrid(e)).BindSelectRoleCallBack(this.bLn), e
			)),
			(this.bLn = (e, t) => {
				this.BLn = e;
				var o =
						ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
							this.NUe,
							ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
						),
					i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
						this.NUe,
					),
					n =
						((i =
							ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
								i.FightFormationId,
							)),
						e.GetLevelData().GetLevel()),
					l =
						((e = e.GetDataId()),
						!ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e));
				(i = i.LimitRole.includes(e)),
					(n = n < o && i && !l),
					this.GetItem(9).SetUIActive(n),
					(o = e > RoleDefine_1.ROBOT_DATA_MIN_ID || (i && !l));
				this.GetButton(10).RootUIComp.SetUIActive(o);
			}),
			(this.rho = () => {
				InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RevertEntranceFlowStep(),
					this.CloseMe();
			}),
			(this.nho = () => {
				var e = this.OpenParam;
				e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
				ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
					e.FightFormationId,
				).LimitRole.includes(this.BLn.GetRoleId())
					? ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
							this.BLn.GetDataId(),
						)
						? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow()
						: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"Rogue_Dont_Have_Role",
							)
					: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"Roguelike_SelectRole_CannotUse",
						);
			}),
			(this.sho = (e) => {
				let t = RoguelikeDefine_1.DEFAULT_ROGUELIKE_ENTRY_RATE;
				for (const i of (this.iho.W8n = e)) {
					var o =
						ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikePopularEntriesById(
							i,
						);
					o && (t += o.Rate);
				}
				let i = UE.Color.FromHex("adadad");
				t > RoguelikeDefine_1.DEFAULT_ROGUELIKE_ENTRY_RATE
					? (i = UE.Color.FromHex("c25757"))
					: t < RoguelikeDefine_1.DEFAULT_ROGUELIKE_ENTRY_RATE &&
						(i = UE.Color.FromHex("36cd33")),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(11),
						"Rogue_Entry_Multiple",
						t / 100,
					),
					this.GetText(11)?.SetColor(i);
			}),
			(this.aho = () => {
				UiManager_1.UiManager.OpenView(
					"RoguelikeInstanceEntrySelectView",
					this.iho,
				);
			}),
			(this.hho = () => {
				2 === this.Q6s
					? RoleController_1.RoleController.OpenRoleMainView(1, 0, [
							this.BLn.GetDataId(),
						])
					: RoleController_1.RoleController.OpenRoleMainView(0, 0, [
							this.BLn.GetDataId(),
						]);
			}),
			(this.ebn = () => {
				HelpController_1.HelpController.OpenHelpById(
					RoguelikeDefine_1.ROGUELIKE_HELP_ID,
				);
			});
	}
	OnBeforeCreate() {
		this.w5i = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(7);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
			[3, UE.UIDynScrollViewComponent],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIText],
			[7, UE.UIText],
			[8, UE.UIButtonComponent],
			[9, UE.UIItem],
			[10, UE.UIButtonComponent],
			[11, UE.UIText],
			[12, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [
				[1, this.rho],
				[2, this.nho],
				[8, this.aho],
				[10, this.hho],
				[12, this.ebn],
			]);
	}
	async OnBeforeStartAsync() {
		var e;
		(this.NUe = this.OpenParam),
			await Promise.all([
				(e =
					await RoguelikeController_1.RoguelikeController.RoguelikePopularEntriesInfoRequest(
						this.NUe,
					)),
				(this.wLn =
					await RoguelikeController_1.RoguelikeController.RoguelikeTrialRoleInfoRequest(
						this.NUe,
					)),
			]),
			(this.iho = e.bws),
			this.sho(e.bws.W8n),
			(this.eho = new RoguelikeSelectRoleBaseGrid()),
			(this.DynamicScrollViewComponent = new DynScrollView_1.DynamicScrollView(
				this.GetUIDynScrollViewComponent(3),
				this.GetItem(4),
				this.eho,
				this.Bqe,
			)),
			await this.DynamicScrollViewComponent.Init(),
			this.GetButton(8)?.GetRootComponent()?.SetUIActive(this.oIn());
	}
	OnStart() {
		(RoguelikeSelectRoleGrid.CurSelectRoleItem = void 0), this.InitRoleList();
	}
	InitRoleList() {
		var e = this.OpenParam;
		e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
		const t =
			ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
				e.FightFormationId,
			);
		0 < (e = this.GetTrailRoleInstanceList(this.wLn)).length &&
			this.tho.push(new RoguelikeSelectRoleData(0, e, t.LimitRole));
		const o = t.LimitRole,
			i = ModelManager_1.ModelManager.RoleModel.GetRoleList();
		e = (ConfigManager_1.ConfigManager.RoleConfig?.GetRoleList()).filter(
			(e) =>
				1 === e.RoleType &&
				!ModelManager_1.ModelManager.RoleModel.IsMainRole(e.Id),
		);
		const n = [];
		o.forEach((e) => {
			(ModelManager_1.ModelManager.RoleModel.IsMainRole(e) &&
				!ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e)) ||
				(void 0 !== i.find((t) => t.GetRoleId() === e)
					? n.push(i.find((t) => t.GetRoleId() === e))
					: n.push(new RoleInstance_1.RoleInstance(e)));
		}),
			(e = e.filter((e) => !o.includes(e.Id)));
		const l = [];
		e.forEach((e) => {
			void 0 !== i.find((t) => t.GetRoleId() === e.Id)
				? l.push(i.find((t) => t.GetRoleId() === e.Id))
				: l.push(new RoleInstance_1.RoleInstance(e.Id));
		}),
			(e = (e, i) => {
				var n,
					l = o.includes(e.GetRoleId()) && 0 !== e.GetLevelData().GetLevel();
				return l !==
					(o.includes(i.GetRoleId()) && 0 !== i.GetLevelData().GetLevel()) ||
					(l = t.RecommendFormation.includes(e.GetRoleId())) !==
						t.RecommendFormation.includes(i.GetRoleId())
					? l
						? -1
						: 1
					: (l = e.GetLevelData().GetLevel()) !==
							(n = i.GetLevelData().GetLevel())
						? n < l
							? -1
							: 1
						: (n = e.GetRoleConfig().QualityId) !==
								(l = i.GetRoleConfig().QualityId)
							? l < n
								? -1
								: 1
							: ((l = e.GetRoleId()),
								(n = i.GetRoleId()) < l ? -1 : l < n ? 1 : 0);
			}),
			l.sort(e),
			n.sort(e),
			this.tho.push(new RoguelikeSelectRoleData(1, n, o, t.RecommendFormation)),
			this.tho.push(new RoguelikeSelectRoleData(2, l, o, t.RecommendFormation)),
			0 < n.length
				? ((this.BLn = n[0]), (this.Q6s = 1))
				: 0 < l.length
					? ((this.BLn = l[0]), (this.Q6s = 2))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Roguelike",
							59,
							"RoguelikeSelectRoleView没有角色数据",
						),
			this.DynamicScrollViewComponent.RefreshByData(this.tho);
	}
	OnBeforeDestroy() {
		UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.w5i);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.RoguelikePopularEntriesChange,
			this.sho,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.RoguelikePopularEntriesChange,
			this.sho,
		);
	}
	OnHandleLoadScene() {
		UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()
			.Model?.CheckGetComponent(1)
			?.SetTransformByTag("RoleCase"),
			RoleController_1.RoleController.OnSelectedRoleChangeByConfig(
				this.BLn.GetRoleId(),
			),
			this.bLn(this.BLn, this.Q6s);
	}
	GetTrailRoleInstanceList(e) {
		const t = [];
		return (
			e.forEach((e) => {
				void 0 !==
					(e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
						ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(
							e,
						),
					)) && t.push(e);
			}),
			t
		);
	}
	oIn() {
		for (const e of ConfigManager_1.ConfigManager.RoguelikeConfig.GetRoguelikePopularEntries())
			if (e.Insts.includes(this.iho.vFn)) return !0;
		return !1;
	}
}
exports.RoguelikeSelectRoleView = RoguelikeSelectRoleView;
class RoguelikeSelectRoleGrid extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.RoleItemList = new Map()),
			(this.Data = void 0),
			(this.qLn = void 0),
			(this.lho = (e) => {
				var t;
				0 === e.State &&
					((t = e.Data).IsTrialRole()
						? (ModelManager_1.ModelManager.RoguelikeModel.EditFormationRoleList =
								[t.GetDataId()])
						: (ModelManager_1.ModelManager.RoguelikeModel.EditFormationRoleList =
								[t.GetRoleId()]),
					RoguelikeSelectRoleGrid.CurSelectRoleItem &&
						RoguelikeSelectRoleGrid.CurSelectRoleItem.SetSelected(!1, !1),
					(RoguelikeSelectRoleGrid.CurSelectRoleItem = e.MediumItemGrid),
					RoguelikeSelectRoleGrid.CurSelectRoleItem.SetSelected(!0, !1),
					RoleController_1.RoleController.OnSelectedRoleChangeByConfig(
						t.GetDataId(),
					),
					this.qLn) &&
					this.qLn(t, this.Data.Type);
			}),
			(this.Data = e);
	}
	BindSelectRoleCallBack(e) {
		this.qLn = e;
	}
	GetUsingItem(e) {
		return this.GetRootItem().GetOwner();
	}
	Update(e, t) {
		this.Data = e;
	}
	async Init(e) {
		await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	OnStart() {
		switch (
			(this.Data.RoleIdList.forEach((e, t) => {
				let o = this.RoleItemList.get(e.GetRoleId());
				if (!o) {
					var i = LguiUtil_1.LguiUtil.CopyItem(
						this.GetItem(2),
						this.GetItem(1),
					);
					o = new RoleSelectionMediumItemGrid_1.RoleSelectionMediumItemGrid();
					const t = e;
					o.CreateThenShowByActorAsync(i.GetOwner()).then(() => {
						var e = {
							Type: 2,
							Data: t,
							ItemConfigId: t.GetRoleId(),
							BottomTextId:
								0 !== t.GetLevelData().GetLevel()
									? "Text_LevelShow_Text"
									: "Text_Role_Not_Have",
							BottomTextParameter: [t.GetLevelData().GetLevel()],
							ElementId: t.GetRoleConfig().ElementId,
							IsTrialRoleVisible: t.IsTrialRole(),
							IsNewVisible: !1,
							IsDisable:
								(0 < this.Data.LimitRoleList.length &&
									!this.Data.LimitRoleList.includes(t.GetRoleId())) ||
								0 === t.GetLevelData().GetLevel(),
							IsRecommendVisible: this.Data.RecommendedRoleList.includes(
								t.GetRoleId(),
							),
						};
						o.Apply(e),
							o.BindOnExtendToggleClicked(this.lho),
							t.IsTrialRole() ||
							void 0 !== RoguelikeSelectRoleGrid.CurSelectRoleItem
								? o.SetSelected(!1, !1)
								: ((RoguelikeSelectRoleGrid.CurSelectRoleItem = o).SetSelected(
										!0,
										!1,
									),
									(ModelManager_1.ModelManager.RoguelikeModel.EditFormationRoleList =
										[t.GetRoleId()]));
					}),
						this.RoleItemList.set(e.GetRoleId(), o);
				}
			}),
			this.GetItem(2).SetUIActive(!1),
			this.Data.Type)
		) {
			case 1:
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(0),
					"Rogue_juesexuanze_02",
				);
				break;
			case 0:
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(0),
					"Rogue_juesexuanze_01",
				);
				break;
			case 2:
				LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(0),
					"Rogue_juesexuanze_03",
				);
		}
	}
	ClearItem() {
		this.Destroy();
	}
}
(exports.RoguelikeSelectRoleGrid = RoguelikeSelectRoleGrid).CurSelectRoleItem =
	void 0;
class RoguelikeSelectRoleBaseGrid extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.eqe = void 0);
	}
	GetItemSize(e) {
		void 0 === this.eqe && (this.eqe = Vector2D_1.Vector2D.Create());
		var t = this.GetRootItem();
		return this.eqe.Set(t.GetWidth(), t.GetHeight()), this.eqe.ToUeVector2D(!0);
	}
	async Init(e) {
		await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
	}
	ClearItem() {}
}
exports.RoguelikeSelectRoleBaseGrid = RoguelikeSelectRoleBaseGrid;
class RoguelikeSelectRoleData {
	constructor(e, t, o, i) {
		(this.Type = 1),
			(this.RoleIdList = []),
			(this.LimitRoleList = []),
			(this.RecommendedRoleList = []),
			(this.Type = e),
			(this.RoleIdList = t),
			o && (this.LimitRoleList = o),
			i && (this.RecommendedRoleList = i);
	}
}
exports.RoguelikeSelectRoleData = RoguelikeSelectRoleData;
