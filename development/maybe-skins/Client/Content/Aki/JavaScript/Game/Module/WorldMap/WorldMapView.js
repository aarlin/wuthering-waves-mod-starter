"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldMapView = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
	MapNoteById_1 = require("../../../Core/Define/ConfigQuery/MapNoteById"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
	UiLayer_1 = require("../../Ui/UiLayer"),
	UiManager_1 = require("../../Ui/UiManager"),
	UiModel_1 = require("../../Ui/UiModel"),
	CommonCurrencyItem_1 = require("../Common/CommonCurrencyItem"),
	LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer"),
	ExploreProgressController_1 = require("../ExploreProgress/ExploreProgressController"),
	ExploreProgressDefine_1 = require("../ExploreProgress/ExploreProgressDefine"),
	InstanceDungeonEntranceConfig_1 = require("../InstanceDungeon/InstanceDungeonEntranceConfig"),
	ItemDefines_1 = require("../Item/Data/ItemDefines"),
	LordGymController_1 = require("../LordGym/LordGymController"),
	MapController_1 = require("../Map/Controller/MapController"),
	MapDefine_1 = require("../Map/MapDefine"),
	MapUtil_1 = require("../Map/MapUtil"),
	ConfigMarkItem_1 = require("../Map/Marks/MarkItem/ConfigMarkItem"),
	TeleportMarkItem_1 = require("../Map/Marks/MarkItem/TeleportMarkItem"),
	MapLifeEventDispatcher_1 = require("../Map/View/BaseMap/Assistant/MapLifeEvent/MapLifeEventDispatcher"),
	MapResourceMgr_1 = require("../Map/View/BaseMap/Assistant/MapResourceMgr"),
	Map_1 = require("../Map/View/BaseMap/Map"),
	MingSuDefine_1 = require("../MingSu/MingSuDefine"),
	PowerController_1 = require("../Power/PowerController"),
	QuestController_1 = require("../QuestNew/Controller/QuestController"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	HotKeyViewDefine_1 = require("../UiNavigation/HotKeyViewDefine"),
	GenericLayout_1 = require("../Util/Layout/GenericLayout"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	LongPressButton_1 = require("../Util/LongPressButton"),
	SecondaryUiComponent_1 = require("./ViewComponent/SecondaryUiComponent"),
	WorldMapInteractComponent_1 = require("./ViewComponent/WorldMapInteractComponent"),
	WorldMapMoveComponent_1 = require("./ViewComponent/WorldMapMoveComponent"),
	WorldMapScaleComponent_1 = require("./ViewComponent/WorldMapScaleComponent"),
	WorldMapController_1 = require("./WorldMapController"),
	WorldMapDefine_1 = require("./WorldMapDefine"),
	WorldMapNoteItem_1 = require("./WorldMapNoteItem"),
	WorldMapSubMapItem_1 = require("./WorldMapSubMapItem"),
	WorldMapUtil_1 = require("./WorldMapUtil"),
	SCALE_STEP = 0.1,
	RAD_2_DEG = 180 / Math.PI,
	DEG_PI_4 = 90,
	MARKICON_HALFSIZE = 70,
	MAX_INT32_NUMBER = 2147483647,
	VIEW_PORT_BUFFER_REGION = 400;
class WorldMapView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.EFo = void 0),
			(this.G2o = void 0),
			(this.yFo = void 0),
			(this.IFo = void 0),
			(this.TFo = void 0),
			(this.LFo = Vector2D_1.Vector2D.Create(0, 0)),
			(this.DFo = void 0),
			(this.RFo = -0),
			(this.UFo = !1),
			(this.AFo = void 0),
			(this.PFo = void 0),
			(this.xFo = void 0),
			(this.wFo = void 0),
			(this.BFo = !1),
			(this.bFo = void 0),
			(this.qFo = void 0),
			(this.GFo = new Vector2D_1.Vector2D()),
			(this.NFo = void 0),
			(this.OFo = void 0),
			(this.kFo = [0, void 0]),
			(this.FFo = void 0),
			(this.VFo = void 0),
			(this.HFo = void 0),
			(this.jFo = void 0),
			(this.WFo = void 0),
			(this.KFo = void 0),
			(this.QFo = new Map()),
			(this.XFo = void 0),
			(this.$Fo = void 0),
			(this.YFo = void 0),
			(this.JFo = void 0),
			(this.I5s = void 0),
			(this.zFo = !1),
			(this.ZFo = 0),
			(this.e3o = 0),
			(this.P6s = !1),
			(this.t3o = !1),
			(this.i3o = !1),
			(this.o3o = () => {
				var e;
				this.e3o <= 0 ||
					((this.e3o = 0),
					(e = this.EFo.SelfPlayerNode?.GetLGUISpaceAbsolutePosition()) &&
						this.KFo?.SetLGUISpaceAbsolutePosition(e),
					this.KFo?.SetUIActive(!0),
					this.YFo?.PlayLevelSequenceByName("Start", !0),
					this.EFo.HandleMapTileDelegate());
			}),
			(this.r3o = void 0),
			(this.n3o = void 0),
			(this.s3o = void 0),
			(this.a3o = void 0),
			(this.h3o = (e, t, o) => {
				if (((this.i3o = !0), this.GetSlider(1).SetValue(t, !1), this.AFo))
					this.s3o.PushMap(this.AFo, !1);
				else {
					let a;
					var i = Vector2D_1.Vector2D.Create(
						this.EFo.GetRootItem().GetAnchorOffset(),
					);
					let n;
					switch (o) {
						case 4:
						case 5:
							n = this.l3o();
					}
					(a = n
						? i
								.SubtractionEqual(n)
								.MultiplyEqual(t / e)
								.AdditionEqual(n)
						: i.MultiplyEqual(t / e)),
						this.s3o.SetMapPosition(a, !1, 2);
				}
				this.U_t();
			}),
			(this._3o = () => {
				this.L_t(), this.U_t(), this.u3o();
			}),
			(this.yze = (e) => {
				("PowerView" !== e && "ExploreProgressView" !== e) ||
					this.r3o.OnUiOpen();
			}),
			(this.$Ge = (e) => {
				("PowerView" !== e && "ExploreProgressView" !== e) ||
					((this.c3o = !1), this.r3o.OnUiClose(), this.m3o());
			}),
			(this.c3o = !1),
			(this.Ihi = () => {
				this.d3o(() => {
					PowerController_1.PowerController.OpenPowerView(), (this.c3o = !0);
				});
			}),
			(this.m3o = () => {
				this.EFo.SetClickRangeVisible(!1),
					this.AFo &&
						(this.AFo.SetSelected(!1), (this.AFo = void 0), this.L_t()),
					this.C3o(!0),
					this.t3o || this.$Fo?.PlayLevelSequenceByName("Show"),
					this.g3o(ModelManager_1.ModelManager.PlatformModel.IsGamepad()),
					this.FFo.SetCursorActive(!0);
			}),
			(this.f3o = () => {
				this.C3o(!1),
					this.t3o
						? (this.t3o = !1)
						: this.$Fo?.PlayLevelSequenceByName("Hide"),
					this.FFo.SetCursorActive(!1);
			}),
			(this.aWe = (e) => {
				this.d3o();
			}),
			(this.k2o = (e) => {
				if (2 !== e.mouseButtonType && !this.c3o) {
					e = e.GetLocalPointInPlane();
					const r = Vector2D_1.Vector2D.Create(e.X, e.Y);
					if (this.UFo && this.p3o(r, this.EFo.SelfPlayerNode)[0])
						this.s3o.FocusPlayer(this.LFo, !0, 1);
					else {
						const l = [];
						e = Vector_1.Vector.Create(e.X, e.Y, e.Z);
						var t = [],
							o = [],
							i = async (e) => {
								var t = await e.GetRootItemAsync();
								return [e, t];
							};
						for (const o of this.EFo.GetMarkItemsByClickPosition(e))
							o.View &&
								o.View.GetInteractiveFlag() &&
								!o.IsOutOfBound &&
								t.push(i(o));
						var a;
						e = Promise.all(t).then((e) => {
							for (const t of e) this.p3o(r, t[1])[0] && l.push(t[0]);
						});
						for ([, a] of this.EFo.GetAllMarkItems())
							for (var [, n] of a) n.IsOutOfBound && o.push(i(n));
						var s = Promise.all(o).then((e) => {
							for (const t of e) this.p3o(r, t[1])[0] && l.push(t[0]);
						});
						Promise.all([s, e]).then(() => {
							0 === l.length
								? this.v3o(r)
								: 1 === l.length
									? this.M3o(l[0])
									: 1 < l.length && this.S3o(l, r);
						});
					}
				}
			}),
			(this.M3o = (e, t) => {
				if (!this.AFo || this.AFo.MarkId !== e.MarkId) {
					var o = ModelManager_1.ModelManager.WorldMapModel;
					(o.CurrentFocalMarkType = e.MarkType),
						(o.CurrentFocalMarkId = e.MarkId);
					let i = !0;
					this.r3o.IsSecondaryUiOpening && ((this.t3o = !0), (i = !1)),
						this.d3o(() => {
							var o;
							(e.IsOutOfBound && (this.s3o.SetMapPosition(e, !0, 1), !t)) ||
								(this.PFo &&
									!this.PFo.IsDestroy &&
									this.PFo.GetRootItemAsync().then((e) => {
										e && this.E3o(e).StopSequenceByKey("Dianji");
									}),
								(this.PFo = e),
								(this.AFo = e),
								this.AFo?.SetSelected(!0),
								Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug(
										"Map",
										50,
										"点击图标",
										["追踪状态:", e.IsTracked],
										["MarkId:", e.MarkId],
									),
								this.AFo instanceof TeleportMarkItem_1.TeleportMarkItem &&
								this.AFo.IsMultiMapTeleport
									? (o =
											ConfigManager_1.ConfigManager.MapConfig?.GetSubMapConfigById(
												this.AFo.MarkConfig.MultiMapFloorId,
											)) && this.u3o(o.GroupId, o.Floor, !0)
									: this.OnSubMapFloorChanged(0),
								this.y3o(e));
						}, i);
				}
			}),
			(this.I3o = async (e, t) => {
				var o = e.filter((e) => e.IsOutOfBound);
				if (0 === o.length)
					this.r3o.ShowMarkMenu(this.RootItem, e),
						this.EFo.SetClickRangeVisible(!0, t);
				else {
					let s = o[0];
					e = await s.GetRootItemAsync();
					let r = Vector2D_1.Vector2D.Distance(
						t,
						Vector2D_1.Vector2D.Create(e.GetAnchorOffset()),
					);
					var i = [];
					for (const e of o)
						e.View &&
							i.push(
								(async (e) => {
									var t = await e.GetRootItemAsync();
									return [e, t];
								})(e),
							);
					for (const e of await Promise.all(i)) {
						var a = e[0],
							n = e[1];
						r >
							(n = Vector2D_1.Vector2D.Distance(
								t,
								Vector2D_1.Vector2D.Create(n.GetAnchorOffset()),
							)) && ((s = a), (r = n));
					}
					(e = Vector2D_1.Vector2D.Create(
						s.UiPosition.X,
						s.UiPosition.Y,
					)).UnaryNegation(e),
						e.MultiplyEqual(this.MapScale),
						this.s3o.SetMapPosition(e, !1, 1);
				}
			}),
			(this.T3o = () => {
				var e = this.EFo.GetMarkItemsByType(11);
				if (e && 0 !== e.size) for (var [, t] of e) this.L3o(t);
			}),
			(this.D3o = (e) => {
				(e = this.EFo.GetMarkItem(e.MarkType, e.MarkId)) &&
					(9 === e.MarkType && (e.IsIgnoreScaleShow = !0), this.L3o(e));
			}),
			(this.R3o = (e, t) => {
				var o = this.EFo.GetMarkItem(e, t);
				o && this.L3o(o),
					this.AFo?.MarkType === e &&
						this.AFo?.MarkId === t &&
						(this.AFo = void 0);
			}),
			(this.L_t = () => {
				var e;
				for ([, e] of (this.U3o(), this.EFo.GetAllMarkItems()))
					for (var [, t] of e) (this.A3o(t) && !t.IsTracked) || this.L3o(t);
				this.i3o = !1;
			}),
			(this.P3o = (e, t) => {
				this.x3o(e, t);
			}),
			(this.w3o = (e) => {
				this.d3o(() => {
					(ModelManager_1.ModelManager.WorldMapModel.HideCustomMarks = 0 === e),
						this.L_t();
				});
			}),
			(this.B3o = () => {
				this.b3o(0.1, 1);
			}),
			(this.q3o = () => {
				this.b3o(-0.1, 1);
			}),
			(this.wvo = () => {
				this.GetButton(5).ComponentHasTag(
					FNameUtil_1.FNameUtil.GetDynamicFName(HotKeyViewDefine_1.EXIT_TAG),
				) && this.r3o.IsSecondaryUiOpening
					? this.d3o()
					: this.CloseMe();
			}),
			(this.gVe = () => {
				var e, t;
				ModelManager_1.ModelManager.FunctionModel.IsOpen(10017)
					? (this.wFo.SetActive(!0),
						(e = ModelManager_1.ModelManager.PowerModel.PowerCount),
						(t =
							ConfigManager_1.ConfigManager.PowerConfig.GetPowerNaturalLimit()),
						this.wFo.SetCountText("ItemShow", e, t))
					: this.wFo.SetActive(!1);
			}),
			(this.b3o = (e, t) => {
				2 === t && this.n3o.IsJoystickZoom && this.s3o.KillTweening(),
					this.r3o.IsSecondaryUiOpening || this.a3o.AddMapScale(e, t);
			}),
			(this.G3o = (e, t) => t.MapNoteConfig.Rank - e.MapNoteConfig.Rank),
			(this.N3o = (e) => {
				(e = this.EFo.GetMarkItem(0, e)) && this.x3o(e.MarkType, e.MarkId);
			}),
			(this.O3o = () => {
				var e = MapNoteById_1.configMapNoteById.GetConfig(2);
				if (e) {
					var t,
						o = ModelManager_1.ModelManager.MingSuModel,
						i = o.GetDragonPoolInstanceById(
							MingSuDefine_1.MING_SU_POOL_CONFIG_ID,
						);
					if (i)
						return (
							(t = i.GetDragonPoolLevel()),
							(t = i.GetNeedCoreCount(t) - i.GetHadCoreCount()),
							(i = o.GetTargetDragonPoolCoreById(
								MingSuDefine_1.MING_SU_POOL_CONFIG_ID,
							)),
							t <= o.GetItemCount(i) && e
								? {
										MapNoteId: 2,
										ClickCallBack: this.N3o,
										MapNoteConfig: e,
										MapMarkId: e.MarkIdMap.get(
											MingSuDefine_1.MING_SU_POOL_CONFIG_ID,
										),
									}
								: void 0
						);
				}
			}),
			(this.k3o = () => {
				var e = MapNoteById_1.configMapNoteById.GetConfig(3);
				if (
					ModelManager_1.ModelManager.TowerModel.CanGetRewardAllDifficulties() &&
					e
				)
					return {
						MapNoteId: 3,
						ClickCallBack: this.N3o,
						MapNoteConfig: e,
						MapMarkId: e.MarkIdMap.get(1),
					};
			}),
			(this.F3o = () => {
				var e =
					ModelManager_1.ModelManager.ExploreLevelModel.GetCountryExploreLevelData(
						WorldMapDefine_1.HUANG_LONG_COUNTRY_ID,
					);
				if (
					e &&
					e.CanLevelUp() &&
					(e = MapNoteById_1.configMapNoteById.GetConfig(5))
				)
					return {
						MapNoteId: 5,
						ClickCallBack: this.N3o,
						MapNoteConfig: e,
						MapMarkId: e.MarkIdMap.get(1),
					};
			}),
			(this.V3o = () => {
				var e = ModelManager_1.ModelManager.LordGymModel.GetCanFightLordGym();
				if (0 !== e) {
					var t = MapNoteById_1.configMapNoteById.GetConfig(5);
					if (t)
						return (
							(e =
								ModelManager_1.ModelManager.LordGymModel.GetMarkIdByLordGymId(
									e,
								)),
							{
								MapNoteId: 8,
								ClickCallBack: this.N3o,
								MapNoteConfig: t,
								MapMarkId: e,
							}
						);
				}
			}),
			(this.H3o = () => {
				var e = MapNoteById_1.configMapNoteById.GetConfig(4),
					t = e.QuestIdList;
				let o = 0,
					i = !1;
				for (const e of t) {
					var a = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e);
					if (2 === a || 1 === a) {
						(o = e), (i = !0);
						break;
					}
				}
				if (i && e)
					return {
						MapNoteId: 4,
						ClickCallBack: (e) => {
							var t = () => {
								var e,
									t,
									i =
										ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()
											.Id;
								i === o &&
									void 0 !==
										(e =
											ModelManager_1.ModelManager.QuestNewModel.TryGetMapMarkIdByQuestId(
												i,
											)) &&
									((t = this.EFo.GetMarkItem(12, e)),
									this.M3o(t, !0),
									Log_1.Log.CheckInfo()) &&
									Log_1.Log.Info(
										"Quest",
										38,
										"选中鸣域等阶升级任务",
										["QuestId", i],
										["MarkID", e],
									);
							};
							ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(o)
								? t()
								: QuestController_1.QuestNewController.RequestTrackQuest(
										o,
										!0,
										2,
										0,
										t,
									);
						},
						MapNoteConfig: e,
					};
			}),
			(this.dKe = (e, t, o) => {
				this.FFo.SetCursorActive(!this.r3o.IsSecondaryUiOpening);
			}),
			(this.j3o = () => {
				ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
					(0 === this.qFo.length
						? this.v3o(this.GFo)
						: 1 === this.qFo.length
							? this.M3o(this.qFo[0])
							: 1 < this.qFo.length && this.S3o(this.qFo, this.GFo));
			}),
			(this.W3o = () => {
				this.n3o.SetJoystickFocus(!0), this.s3o.FocusPlayer(this.LFo, !0, 1);
			}),
			(this.K3o = () => {
				ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(
					ExploreProgressDefine_1.AREA_LEVEL,
				)
					? (this.HFo.SetActive(!0), this.HFo.Update())
					: this.HFo.SetActive(!1);
			}),
			(this.OnSubMapFloorChanged = (e, t) => {
				this.JFo.DeselectCurrentGridProxy(),
					this.JFo.SelectGridProxy(e),
					0 === e
						? ((this.zFo = !1), this.EFo?.HideSubMapTile(), this.u3o())
						: ((this.zFo = !0), this.EFo.ShowSubMapTile(this.ZFo, e, !t));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UISliderComponent],
			[2, UE.UIButtonComponent],
			[3, UE.UIButtonComponent],
			[4, UE.UIItem],
			[5, UE.UIButtonComponent],
			[6, UE.UIExtendToggle],
			[7, UE.UINiagara],
			[8, UE.UIItem],
			[9, UE.UIItem],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[13, UE.UIItem],
			[14, UE.UIItem],
			[15, UE.UIItem],
			[16, UE.UIItem],
			[17, UE.UIItem],
			[18, UE.UIItem],
			[19, UE.UIVerticalLayout],
			[20, UE.UIItem],
		]),
			(this.BtnBindInfo = [[5, this.wvo]]);
	}
	async OnBeforeStartAsync() {
		(this.G2o = this.GetItem(13)
			.GetOwner()
			.GetComponentByClass(UE.KuroWorldMapUIParams.StaticClass())),
			await this.Q3o(),
			await this.XFo.OnWorldMapBeforeStartAsync(),
			(this.JFo = new GenericLayout_1.GenericLayout(
				this.GetVerticalLayout(19),
				() => new WorldMapSubMapItem_1.WorldMapSubMapItem(),
			));
	}
	async Q3o() {
		await Promise.all([
			ExploreProgressController_1.ExploreProgressController.AllExploreProgressAsyncRequest(),
			LordGymController_1.LordGymController.LordGymInfoRequest(),
		]),
			await Promise.all([
				this.X3o(),
				this.$3o(),
				this.Y3o(),
				this.J3o(),
				this.z3o(),
				this.Z3o(),
				this.e4o(),
			]),
			this.t4o();
	}
	async X3o() {
		(this.VFo = new MapResourceMgr_1.MapResourceMgr()),
			await this.VFo.PreloadMapAssets();
	}
	async $3o() {
		(this.WFo = this.GetItem(18)),
			(this.EFo = new Map_1.BaseMap(
				2,
				this.MapScale,
				this.WFo,
				1,
				this.G2o.MarkMenuRectSize,
				this.VFo.GetPreloadMapTile(),
			)),
			(this.XFo = new MapLifeEventDispatcher_1.MapLifeEventDispatcher(
				this.EFo,
			)),
			await this.EFo.CreateThenShowByResourceIdAsync(
				"UiItem_Map_Prefab",
				this.GetItem(9),
				!0,
			);
	}
	async Z3o() {
		(this.wFo = new CommonCurrencyItem_1.CommonCurrencyItem()),
			await this.wFo.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()),
			this.wFo.ShowWithoutText(ItemDefines_1.EItemId.Power),
			this.wFo.SetButtonFunction(this.Ihi),
			this.wFo.SetActive(!1);
	}
	async Y3o() {
		var e = this.GetItem(12);
		(this.FFo = new HandleCursorBotton()),
			await this.FFo.Initialize(e, this.j3o),
			this.FFo.SetCursorActive(!0);
	}
	async J3o() {
		(this.HFo = new ExploreItem()), await this.HFo.Init(this.GetItem(15));
	}
	async z3o() {
		var e = this.GetItem(16),
			t =
				((this.jFo = new WorldMapTowerItem()),
				await this.jFo.Init(e),
				ModelManager_1.ModelManager.FunctionModel.IsOpen(10055));
		e.SetUIActive(t), this.jFo.Update(this.EFo);
	}
	async e4o() {
		var e = this.OpenParam;
		(this.e3o = e?.OpenAreaId ?? 0),
			0 < this.e3o &&
				((e = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
					"UiItem_MapUnlock",
					this.RootItem,
				)),
				(this.KFo = e.GetComponentByClass(UE.UIItem.StaticClass())),
				this.KFo.SetUIActive(!1),
				(this.YFo = new LevelSequencePlayer_1.LevelSequencePlayer(this.KFo)));
	}
	t4o() {
		(this.NFo = new LongPressButton_1.LongPressButton(
			this.GetButton(2),
			this.B3o,
		)),
			(this.OFo = new LongPressButton_1.LongPressButton(
				this.GetButton(3),
				this.q3o,
			));
	}
	i4o() {
		var e = this.GetExtendToggle(6);
		e.SetToggleState(
			ModelManager_1.ModelManager.WorldMapModel.HideCustomMarks ? 0 : 1,
		),
			e.OnStateChange.Clear(),
			e.OnStateChange.Add(this.w3o),
			ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel() &&
				e.SetSelfInteractive(
					ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam(),
				);
	}
	o4o() {
		this.RFo = 0;
		var e = this.GetItem(8).GetWidth() / this.RootItem.GetWidth(),
			t = this.GetItem(8).GetHeight() / this.RootItem.GetHeight(),
			o = WorldMapUtil_1.WorldMapUtil.GetViewportSizeByPool();
		(e =
			((this.IFo = new UE.Vector2D((o.X / 2) * e - 70, (o.Y / 2) * t - 70)),
			(this.TFo = new UE.Vector2D((o.X / 2 + 400) * e, (o.Y / 2 + 400) * t)),
			this.GetSlider(1))).SetMinValue(
			ModelManager_1.ModelManager.WorldMapModel.MapScaleMin,
			!1,
			!1,
		),
			e.SetMaxValue(
				ModelManager_1.ModelManager.WorldMapModel.MapScaleMax,
				!1,
				!1,
			),
			e.OnValueChangeCb.Bind(this.a3o.OnScaleSliderValueChanged);
	}
	r4o() {
		var e = this.EFo.SelfPlayerNode;
		e.SetUIActive(!0), e.SetAsLastHierarchy();
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.MarkMenuClickItem,
			this.M3o,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ScenePlayerLocationChanged,
				this.T3o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPowerChanged,
				this.gVe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnViewDone,
				this.yze,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldMapPointerDrag,
				this.aWe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldMapFingerExpandClose,
				this.b3o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldMapWheelAxisInput,
				this.b3o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldMapHandleTriggerAxisInput,
				this.b3o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldMapPointerUp,
				this.k2o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldMapSecondaryUiClosed,
				this.m3o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldMapSecondaryUiOpened,
				this.f3o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldMapScaleChanged,
				this.h3o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldMapPositionChanged,
				this._3o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldMapJoystickFocusPlayer,
				this.W3o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GetAreaProgress,
				this.K3o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UnTrackMark,
				this.L_t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TrackMark,
				this.L_t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnWorldMapTrackMarkItem,
				this.P3o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CreateMapMark,
				this.D3o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RemoveMapMark,
				this.R3o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.MarkForceVisibleChanged,
				this.L_t,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BlackScreenFadeOnPlotToWorldMap,
				this.o3o,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldMapSubMapChanged,
				this.OnSubMapFloorChanged,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.MarkMenuClickItem,
			this.M3o,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ScenePlayerLocationChanged,
				this.T3o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPowerChanged,
				this.gVe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnViewDone,
				this.yze,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseView,
				this.$Ge,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldMapPointerDrag,
				this.aWe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldMapFingerExpandClose,
				this.b3o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldMapWheelAxisInput,
				this.b3o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldMapHandleTriggerAxisInput,
				this.b3o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldMapPointerUp,
				this.k2o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldMapSecondaryUiClosed,
				this.m3o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldMapSecondaryUiOpened,
				this.f3o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldMapScaleChanged,
				this.h3o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldMapPositionChanged,
				this._3o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldMapJoystickFocusPlayer,
				this.W3o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GetAreaProgress,
				this.K3o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UnTrackMark,
				this.L_t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TrackMark,
				this.L_t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnWorldMapTrackMarkItem,
				this.P3o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CreateMapMark,
				this.D3o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RemoveMapMark,
				this.R3o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.MarkForceVisibleChanged,
				this.L_t,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.BlackScreenFadeOnPlotToWorldMap,
				this.o3o,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldMapSubMapChanged,
				this.OnSubMapFloorChanged,
			);
	}
	OnStart() {
		(this.bFo = []),
			this.n4o(),
			this.LogicComponentsOnBegin(),
			(this.$Fo = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.GetItem(17),
			)),
			PowerController_1.PowerController.SendUpdatePowerRequest(),
			(this.yFo = this.OpenParam);
	}
	OnBeforeShow() {
		this.LogicComponentsOnShow(),
			this.i4o(),
			this.r4o(),
			this.o4o(),
			this.GetSlider(1).SetValue(this.MapScale, !1),
			this.GetItem(11).SetActive(!0),
			this.C3o(!0),
			this.K3o(),
			this.U_t();
		var e,
			t = this.yFo;
		this.r3o.IsSecondaryUiOpening ||
			(t &&
				t.IsNotFocusTween &&
				(e = this.EFo.GetMarkItem(t.MarkType, t.MarkId)) &&
				((t.StartScale = this.a3o.MapScale),
				(t.StartWorldPosition = Vector2D_1.Vector2D.Create(
					-e.UiPosition.X * t.StartScale,
					-e.UiPosition.Y * t.StartScale,
				))),
			t?.StartScale &&
				(this.a3o?.SetMapScale(t.StartScale, 6, !1),
				this.GetSlider(1).SetValue(t.StartScale, !1)),
			t?.StartWorldPosition
				? this.s3o?.SetMapPosition(t.StartWorldPosition, !1)
				: MapUtil_1.MapUtil.IsInBigWorld(
							ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
								.MapConfigId,
						)
					? (this.U3o(), this.s3o.FocusPlayer(this.LFo, !1, 1))
					: ((e =
							ModelManager_1.ModelManager.GameModeModel.InstanceDungeon
								.RecoverWorldLocation),
						(t = MapUtil_1.MapUtil.WorldPosition2UiPosition2D(
							Vector2D_1.Vector2D.Create(e[1] ?? 0, e[2] ?? 0),
						)),
						this.s3o.FocusPlayer(t, !1, 1))),
			this.EFo.SelfPlayerNode.SetUIActive(
				MapUtil_1.MapUtil.IsInBigWorld(
					ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.MapConfigId,
				),
			),
			this.T3o(),
			this.s4o(),
			this.L_t(),
			0 < this.e3o && this.EFo.HandleAreaOpen(this.e3o),
			this.Q7s(),
			this.XFo.OnWorldMapBeforeShow();
	}
	OnAfterShow() {
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapViewOpened);
		var e,
			t = this.yFo;
		t &&
			((e = this.EFo.GetMarkItem(t.MarkType, t.MarkId)) &&
				(1 === e.MarkType
					? this.s3o.PushMap(e, !t.IsNotFocusTween)
					: this.x3o(t.MarkType, t.MarkId)),
			(this.yFo = void 0)),
			this.XFo.OnWorldMapAfterShow();
	}
	OnBeforeHide() {
		this.LogicComponentsOnHide(), this.EFo.UnBindMapTileDelegate();
	}
	OnTick(e) {
		this.qFo || (this.qFo = new Array()),
			this.n3o?.CheckTouch(),
			this.s3o?.TickMoveDirty(),
			this.g3o();
	}
	a4o() {
		if (ModelManager_1.ModelManager.PlatformModel.IsGamepad()) {
			var e,
				t = this.FFo.GetRootItem().K2_GetComponentLocation(),
				o = this.EFo.MapRootItem.K2_GetComponentToWorld();
			o = UE.KismetMathLibrary.InverseTransformLocation(o, t);
			for ([, e] of (this.GFo.Set(o.X, o.Y),
			(this.kFo[0] = 2147483647),
			this.qFo.splice(0),
			this.EFo.GetAllMarkItems()))
				for (const [, t] of e)
					t.View &&
						t.GetRootItemAsync().then((e) => {
							var [e, o] = this.p3o(this.GFo, e),
								i = t.View.GetInteractiveFlag();
							e &&
								i &&
								(this.kFo[0] > o && ((this.kFo[0] = o), (this.kFo[1] = t)),
								this.qFo.push(t));
						});
			this.FFo.SetSelected(!1);
		}
	}
	h4o(e = !1) {
		((ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
			this.n3o.IsJoystickMoving) ||
			e) &&
			(this.s3o.KillTweening(), this.a4o());
	}
	l4o() {
		if (
			ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
			!this.n3o.IsJoystickMoving &&
			!this.n3o.IsJoystickZoom
		) {
			if (this.n3o.IsJoystickFocus) {
				if (this.s3o.IsTweeningMove) return;
				this.n3o.SetJoystickFocus(!1), this.a4o();
			}
			0 < this.qFo.length &&
				void 0 === this.AFo &&
				(this.FFo.SetSelected(!0),
				this.s3o.SetMapPosition(
					this.kFo[1],
					!0,
					0,
					this.G2o.TweenTypeEase,
					this.G2o.GamePadTweenTime,
				));
		}
	}
	g3o(e = !1) {
		this.h4o(e), this.l4o();
	}
	OnBeforeDestroy() {
		this.d3o(),
			this._4o(),
			WorldMapController_1.WorldMapController.ClearFocalMarkItem(),
			this.GetExtendToggle(6).OnStateChange.Clear(),
			this.NFo.OnDestroy(),
			this.OFo.OnDestroy(),
			this.YFo?.Clear(),
			this.$Fo?.Clear(),
			(this.qFo = void 0),
			this.wFo.Destroy(),
			this.EFo.Destroy(),
			this.VFo.Destroy(),
			this.FFo.Destroy(),
			this.u4o();
	}
	n4o() {
		(this.xFo = new Map()),
			(this.r3o = new SecondaryUiComponent_1.SecondaryUiComponent(this.EFo)),
			this.xFo.set(0, this.r3o),
			(this.n3o = new WorldMapInteractComponent_1.WorldMapInteractComponent(
				this.EFo,
				this.G2o,
			)),
			this.xFo.set(1, this.n3o),
			(this.s3o = new WorldMapMoveComponent_1.WorldMapMoveComponent(
				this.EFo,
				this.G2o,
			)),
			this.xFo.set(2, this.s3o),
			(this.a3o = new WorldMapScaleComponent_1.WorldMapScaleComponent(
				this.EFo,
			)),
			this.xFo.set(3, this.a3o);
	}
	u4o() {
		if (this.xFo) {
			for (var [, e] of this.xFo) e.Destroy();
			this.xFo.clear(),
				(this.xFo = void 0),
				(this.r3o = void 0),
				(this.n3o = void 0),
				(this.s3o = void 0),
				(this.a3o = void 0);
		}
	}
	LogicComponentsOnBegin() {
		if (this.xFo) for (var [, e] of this.xFo) e.Begin();
	}
	LogicComponentsOnShow() {
		if (this.xFo) for (var [, e] of this.xFo) e.Show();
	}
	LogicComponentsOnHide() {
		if (this.xFo) for (var [, e] of this.xFo) e.Hide();
	}
	GetLogicComponent(e) {
		return this.xFo.get(e);
	}
	get MapScale() {
		return ModelManager_1.ModelManager.WorldMapModel.MapScale;
	}
	l3o() {
		var e = Global_1.Global.CharacterController;
		if (e) {
			let i;
			switch (ModelManager_1.ModelManager.PlatformModel.PlatformType) {
				case 3:
				case 4:
				case 5:
					i = Vector2D_1.Vector2D.Create(e.GetCursorPosition());
					break;
				case 1:
				case 2:
					i = this.n3o.MultiTouchOriginCenter;
			}
			if (i) {
				var t,
					o = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler();
				if (o)
					return (
						(o = o.ConvertPositionFromViewportToLGUICanvas(i.ToUeVector2D())),
						(t = WorldMapUtil_1.WorldMapUtil.GetViewportSizeByPool()).Set(
							o.X - t.X / 2,
							o.Y - t.Y / 2,
						),
						t
					);
			}
		}
	}
	y3o(e, t = 1) {
		ModelManager_1.ModelManager.PlatformModel.IsInGamepad()
			? this.s3o.PushMap(e, !0, 0)
			: this.s3o.PushMap(e, !0, 1),
			this.r3o.ShowPanel(e, this.RootItem, this.c4o(), t);
	}
	d3o(e, t = !0) {
		this.AFo &&
			this.AFo.IsIgnoreScaleShow &&
			((this.AFo.IsIgnoreScaleShow = !1),
			this.AFo.SetSelected(!1),
			this.L3o(this.AFo)),
			this.r3o.IsSecondaryUiOpening
				? (this.r3o.CloseUi(e, t),
					UiManager_1.UiManager.IsViewOpen("PowerView") &&
						UiManager_1.UiManager.CloseView("PowerView"))
				: e && e();
	}
	p3o(e, t) {
		return t
			? [
					(e = Vector2D_1.Vector2D.Distance(
						e,
						Vector2D_1.Vector2D.Create(t.GetAnchorOffset()),
					)) *
						this.MapScale <=
						this.G2o.MarkMenuRectSize,
					e,
				]
			: [!1, 0];
	}
	v3o(e) {
		this.s3o.IsTweeningMove && this.s3o.KillTweening(),
			WorldMapController_1.WorldMapController.ClearFocalMarkItem(),
			this.r3o.IsSecondaryUiOpening
				? (this.L_t(), this.d3o())
				: this.c4o() ===
						ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize
					? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"WorldMapTagFull",
						)
					: ModelManager_1.ModelManager.WorldMapModel.HideCustomMarks ||
						((this.AFo = this.m4o(e)),
						this.AFo &&
							((this.AFo.IsIgnoreScaleShow = !0),
							(this.AFo.IsCanShowView = !0),
							this.y3o(this.AFo, 0)),
						AudioSystem_1.AudioSystem.PostEvent(
							"play_ui_ia_spl_map_click_com",
						));
	}
	m4o(e) {
		var t = void 0,
			o = e.X,
			i = e.Y,
			a =
				(a = MapController_1.MapController.GetMarkPosition(o, -i)) ||
				Vector2D_1.Vector2D.Create(o, i);
		o = new MapDefine_1.DynamicMarkCreateInfo(a, 1, 9);
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Map",
					64,
					"[CustomMarkItem Debug]WorldMapView.CreateNewCustomMarkItem->",
					["position", e],
					["info", o],
				),
			(t = this.EFo.CreateCustomMark(o))?.SetIsNew(!0),
			t
		);
	}
	E3o(e) {
		let t = this.QFo.get(e);
		return (
			t ||
				((t = new LevelSequencePlayer_1.LevelSequencePlayer(e)),
				this.QFo.set(e, t)),
			t
		);
	}
	S3o(e, t) {
		this.r3o.IsSecondaryUiOpening && (this.t3o = !0),
			this.d3o(() => {
				this.I3o(e, t),
					AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_spl_map_click_com");
			}),
			WorldMapController_1.WorldMapController.ClearFocalMarkItem();
	}
	async L3o(e) {
		let t;
		var o,
			i,
			a,
			n,
			s = this.MapScale;
		(e.LogicWorldScale = s),
			e.LogicUpdate(this.DFo),
			e.ViewUpdate(this.DFo, this.n3o.IsDragging, this.i3o),
			e.View &&
				((o = Vector2D_1.Vector2D.Create(e.UiPosition.X, e.UiPosition.Y)),
				e.IsTracked
					? ((i = Vector2D_1.Vector2D.Create(
							this.EFo.GetRootItem().GetAnchorOffset(),
						)),
						(a = Vector2D_1.Vector2D.Create()),
						([a, n] = (o.Multiply(s, a).Addition(i, a), this.d4o(a))),
						(t = await e.GetRootItemAsync()),
						n
							? ((e.IsOutOfBound = !0),
								e.View.SetOutOfBoundDirection(a),
								t.SetAnchorOffset(
									a.SubtractionEqual(i).DivisionEqual(s).ToUeVector2D(!0),
								))
							: ((e.IsOutOfBound = !1), t.SetAnchorOffset(o.ToUeVector2D(!0))))
					: ((e.IsOutOfBound = !1),
						(t = await e.GetRootItemAsync()).SetAnchorOffset(
							o.ToUeVector2D(!0),
						)));
	}
	x3o(e, t) {
		var o = this.EFo.GetMarkItem(e, t);
		o
			? !(o instanceof ConfigMarkItem_1.ConfigMarkItem) ||
				(o.IsFogUnlock && o.IsConditionShouldShow)
				? ((o.IsCanShowView = !0),
					(o.IsIgnoreScaleShow = !0),
					o?.View?.GetInteractiveFlag() && this.M3o(o, !0))
				: ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"MapAreaIsLock",
					)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Map",
					50,
					"申请了不存在的地图标记",
					["地图标记类型:", e],
					["地图标记Id", t],
				);
	}
	U3o() {
		this.C4o(),
			this.EFo.PlayerArrow.SetUIRelativeRotation(
				new UE.Rotator(0, this.RFo, 0),
			);
		var e = Vector2D_1.Vector2D.Create(
				this.EFo.GetRootItem().GetAnchorOffset(),
			),
			t = Vector2D_1.Vector2D.Create(),
			[o, i] =
				(this.LFo.Multiply(this.MapScale, t).Addition(e, t), this.d4o(t)),
			a = this.EFo.PlayerOutOfBoundIndicator;
		i
			? ((this.UFo = !0),
				this.EFo.SelfPlayerNode.SetAnchorOffset(
					o.SubtractionEqual(e).DivisionEqual(this.MapScale).ToUeVector2D(!0),
				),
				(o = Math.atan2(t.Y, t.X) * RAD_2_DEG - 90),
				a.SetUIRelativeRotation(new UE.Rotator(0, o, 0)))
			: ((this.UFo = !1),
				this.EFo.SelfPlayerNode.SetAnchorOffset(this.LFo.ToUeVector2D())),
			a.SetUIActive(i);
	}
	C4o() {
		var e,
			t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		t &&
			(t = t.Entity.GetComponent(3)) &&
			((this.DFo = t.ActorLocationProxy),
			(e = Vector2D_1.Vector2D.Create(this.DFo.X, this.DFo.Y)),
			(this.LFo = MapUtil_1.MapUtil.WorldPosition2UiPosition2D(e, e)),
			(this.RFo = -(t.ActorRotation.Yaw + 90)));
	}
	d4o(e) {
		var t,
			o = this.IFo;
		return Math.abs(e.X) < o.X && Math.abs(e.Y) < o.Y
			? [e, !1]
			: ((t = Vector2D_1.Vector2D.Create()),
				Math.abs(e.X / e.Y) > o.X / o.Y
					? e.Multiply(o.X / Math.abs(e.X), t)
					: e.Multiply(o.Y / Math.abs(e.Y), t),
				[t, !0]);
	}
	A3o(e) {
		return (
			(e = Vector2D_1.Vector2D.Create(
				e.UiPosition.X * ModelManager_1.ModelManager.WorldMapModel.MapScale +
					this.EFo.GetRootItem().GetAnchorOffsetX(),
				e.UiPosition.Y * ModelManager_1.ModelManager.WorldMapModel.MapScale +
					this.EFo.GetRootItem().GetAnchorOffsetY(),
			)),
			Math.abs(e.X) > this.TFo.X || Math.abs(e.Y) > this.TFo.Y
		);
	}
	c4o() {
		var e = this.EFo.GetMarkItemsByType(9);
		return e ? e.size : 0;
	}
	s4o() {
		var e = [];
		for (const o of [this.O3o, this.k3o, this.H3o, this.F3o, this.V3o]) {
			var t = o();
			t && e.push(t);
		}
		for (const e of this.bFo) e.GetRootItem().SetUIActive(!1);
		e.sort(this.G3o);
		for (let t = 0; t < e.length; t++) {
			var o = e[t];
			this.g4o(o, t);
		}
	}
	g4o(e, t) {
		var o = e.MapNoteConfig.ConditionId;
		(0 !== o &&
			!ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
				o.toString(),
				void 0,
			)) ||
			(this.bFo.length > t
				? (this.bFo[t].UpdateNoteItem(
						e.MapNoteId,
						e.ClickCallBack,
						e.MapMarkId,
					),
					this.bFo[t].GetRootItem().SetUIActive(!0))
				: ((o = LguiUtil_1.LguiUtil.CopyItem(
						this.GetItem(14),
						this.GetItem(11),
					)),
					(t = new WorldMapNoteItem_1.WorldMapNoteItem(o)),
					this.bFo.push(t),
					t.UpdateNoteItem(e.MapNoteId, e.ClickCallBack, e.MapMarkId)));
	}
	_4o() {
		for (const e of this.bFo) e.Destroy();
		this.bFo.length = 0;
	}
	C3o(e) {
		e !== this.BFo && ((this.BFo = e), this.GetItem(11).SetUIActive(e));
	}
	GetGuideUiItemAndUiItemForShowEx(e) {
		let t;
		if ("PanelIndex" === e[0]) {
			var o = Number(e[1]);
			t = this.r3o.GetSecondaryPanelGuideFocusUiItem(o);
		} else {
			if (
				((o = Number(e[0])),
				(e =
					ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(o)?.ObjectType),
				!e)
			)
				return void (
					Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Guide",
						17,
						"聚焦引导的额外参数配置有误, 找不到地图标记",
						["markId", o],
					)
				);
			const i = this.EFo.GetMarkItem(e, o);
			(t = i?.View.GetIconItem()),
				this.s3o.SetMapPosition(i, !0, 1),
				t
					.GetOwner()
					.AddComponentByClass(
						UE.UIButtonComponent.StaticClass(),
						!1,
						new UE.Transform(),
						!1,
					)
					.OnClickCallBack.Bind(() => {
						this.M3o(i);
					});
		}
		if (void 0 !== t) return [t, t];
	}
	U_t() {
		var e = this.EFo.GetRootItem(),
			t = e.GetAnchorOffset();
		this.WFo.SetAnchorOffset(t), (t = e.RelativeScale3D);
		this.WFo.SetRelativeScale3D(t),
			this.WFo.SetWidth(e.Width),
			this.WFo.SetHeight(e.Height);
	}
	Q7s() {
		var e = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
		e &&
			(e =
				ConfigManager_1.ConfigManager.MapConfig?.GetSubMapConfigByAreaId(e)) &&
			this.u3o(e.GroupId, e.Floor, !0, !1);
	}
	async u3o(e = void 0, t = void 0, o = !1, i = !0) {
		var a,
			n =
				ModelManager_1.ModelManager.AreaModel?.GetCurrentAreaId(
					ExploreProgressDefine_1.AREA_LEVEL,
				) ?? 0;
		n = ModelManager_1.ModelManager.MapModel.CheckAreasUnlocked(n) ?? !1;
		if (0 === (e = e || this.EFo.GetSubMapGroupIdByPosition()))
			return this.P6s
				? ((a = this.zFo) ||
						((this.ZFo = 0),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.WorldMapSelectMultiMap,
							0,
						)),
					void (await this.L4s(a && n)))
				: void 0;
		if ((!this.P6s || o) && n) {
			this.ZFo = e;
			let o =
				ConfigCommon_1.ConfigCommon.ToList(
					ConfigManager_1.ConfigManager.MapConfig?.GetSubMapConfigByGroupId(e),
				) ?? [];
			if (
				((o = o.filter(
					(e) =>
						ModelManager_1.ModelManager.MapModel.CheckUnlockMultiMapIds(e.Id) ||
						0 === e.Floor,
				)).sort((e, t) => t.Floor - e.Floor),
				1 !== o.length)
			) {
				let e = 0,
					a = 0;
				t &&
					o.forEach((o, i) => {
						o.Floor === t && ((e = i), (a = o.Id));
					}),
					0 !== e &&
						(EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.WorldMapSelectMultiMap,
							a,
						),
						this.OnSubMapFloorChanged(e, i)),
					this.I5s && (await this.I5s.Promise),
					(this.I5s = new CustomPromise_1.CustomPromise()),
					await this.L4s(!0),
					await this.JFo?.RefreshByDataAsync(o, !1),
					this.JFo.SelectGridProxy(e),
					this.I5s.SetResult(!0);
			}
		}
	}
	async L4s(e) {
		return (
			this.P6s !== e &&
				((this.P6s = e),
				this.P6s
					? await this.PlaySequenceAsync("LevelShow")
					: await this.PlaySequenceAsync("LevelHide"),
				this.GetItem(20)?.SetUIActive(this.P6s)),
			!0
		);
	}
}
exports.WorldMapView = WorldMapView;
class ExploreItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(),
			(this.Kyt = () => {
				UiManager_1.UiManager.OpenView("ExploreDetailView", void 0, (e, t) => {
					e && UiModel_1.UiModel.NormalStack.Peek().AddChildViewById(t);
				});
			});
	}
	async Init(e) {
		await this.CreateThenShowByActorAsync(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
			[2, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.Kyt]]);
	}
	Update() {
		var e =
				ModelManager_1.ModelManager.AreaModel?.GetCurrentAreaId(
					ExploreProgressDefine_1.AREA_LEVEL,
				) ?? 0,
			t =
				ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(e);
		e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e);
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(2),
				"Text_ExploreRate",
				t?.GetProgress() ?? 0,
			);
	}
}
class WorldMapTowerItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(),
			(this.aAi = !1),
			(this.EFo = void 0),
			(this.YP = () => {
				let e = !1;
				for (var [, t] of this.EFo.GetAllMarkItems()) {
					if (e) break;
					for (var [, o] of t)
						if (
							o instanceof TeleportMarkItem_1.TeleportMarkItem &&
							o.IsTowerEntrance &&
							o.IsCanShowView
						) {
							var i =
								0 !== o.MarkConfig.RelativeId
									? o.MarkConfig.RelativeId
									: ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(
											o.MarkConfigId,
										);
							if (
								ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlowId(
									i,
								) ===
								InstanceDungeonEntranceConfig_1.EInstanceEntranceFlowType
									.NewTower
							) {
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.MarkMenuClickItem,
									o,
								),
									(e = !0);
								break;
							}
						}
				}
			}),
			(this.F6s = () => {
				this.aqe();
			});
	}
	async Init(e) {
		await this.CreateThenShowByActorAsync(e.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[3, UE.UIButtonComponent],
			[1, UE.UIText],
		]),
			(this.BtnBindInfo = [[3, this.YP]]);
	}
	SetShowState(e) {
		this.aAi = e;
	}
	GetCurrentShowState() {
		return this.aAi;
	}
	OnStart() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnTowerRefreshStars,
			this.F6s,
		);
	}
	OnBeforeDestroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnTowerRefreshStars,
			this.F6s,
		);
	}
	Update(e) {
		(this.EFo = e), this.aqe();
	}
	aqe() {
		var e = (o = ModelManager_1.ModelManager.TowerModel).GetMaxDifficulty(),
			t = o.GetDifficultyMaxStars(e),
			o = o.GetDifficultyAllStars(e);
		this.GetText(1).SetText(t + "/" + o);
	}
}
class HandleCursorBotton extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.f4o = !1),
			(this.VCt = void 0),
			(this.p4o = void 0);
	}
	async Initialize(e, t) {
		(this.p4o = t), await this.CreateThenShowByActorAsync(e.GetOwner());
	}
	OnStart() {
		this.RootItem?.SetRaycastTarget(!1),
			(this.VCt = this.GetRootActor().GetComponentByClass(
				UE.UIButtonComponent.StaticClass(),
			)),
			this.VCt.OnClickCallBack.Bind(this.p4o);
	}
	OnBeforeDestroy() {
		this.VCt.OnClickCallBack.Unbind();
	}
	SetSelected(e) {
		ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
			this.f4o !== e &&
			((this.f4o = e)
				? this.VCt.SetSelectionState(1)
				: this.VCt.SetSelectionState(0));
	}
	SetCursorActive(e) {
		ModelManager_1.ModelManager.PlatformModel.IsGamepad() && e
			? this.SetActive(!0)
			: this.SetActive(!1);
	}
}
