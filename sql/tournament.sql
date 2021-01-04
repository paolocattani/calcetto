

--  Available tournament for user
    select *
    from tournament
    where public = true and progress in ('stage1','stage2')
